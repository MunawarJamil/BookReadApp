import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../Redux/features/BookSlice";
import { useNavigate } from "react-router-dom";
import LoadMoreButton from "./Loadmore";
import CircularIndeterminate from "./Loader";
function AllBooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entities, loading, error, nextCursor } = useSelector(
    (state) => state.books
  );
  const checkUserStatus = useSelector((state) => state.user.isLoggedIn);

  const [searchKeyword, setSearchKeyword] = useState(""); // State for the search keyword
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [isFetchingMore, setIsFetchingMore] = useState(false); // State for fetching more books

  // Ref for the last item in the list
  const lastItemRef = useRef(null);

  useEffect(() => {
    dispatch(getBooks(currentPage)); // Fetch books for the current page
  }, [dispatch, currentPage]);

  // Filtered posts based on search keyword
  const filteredPosts = entities.filter((post) =>
    post.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value); // Update the search keyword
  };

  // Handle book item click
  const handleItemClick = (post) => {
    checkUserStatus
      ? navigate(`/book/${post.id}`, { state: { book: post } })
      : navigate("/signin");
  };

  // Load more books when the last item is in view
  const loadMoreBooks = () => {
    setIsFetchingMore(true);
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
    setIsFetchingMore(false);
    setTimeout(() => {}, 0); // 2 seconds delay
  };
  // Handle Intersection Observer
  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !isFetchingMore) {
      loadMoreBooks();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, loading]);

  return (
    <>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleInputChange}
        placeholder="Search books..."
        className="search-input"
      />

      <div className="text-center">
        {filteredPosts.map((post, index) => (
          <p
            key={post.id}
            onClick={() => handleItemClick(post)} // Handle item click
            className="cursor-pointer hover:bg-gray-200"
          >
            {index + 1}. {post.title}
          </p>
        ))}

        {loading && (
          <p className=" flex justify-center">
            <CircularIndeterminate />
          </p>
        )}
        {error && <p>Error loading books: {error}</p>}
        <div ref={lastItemRef} />
      </div>
      <div>
        <LoadMoreButton />
      </div>
    </>
  );
}

export default AllBooks;
