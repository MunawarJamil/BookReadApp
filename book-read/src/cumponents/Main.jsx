import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../Redux/features/BookSlice";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
// import { useRef } from "react";
function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entities, loading, error, nextCursor } = useSelector(
    (state) => state.books
  );
  const checkUserStatus = useSelector((state) => state.user.isLoggedIn);

  const [searchKeyword, setSearchKeyword] = useState(""); // State for the search keyword
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state

  const [currentPage, setCurrentPage] = useState(1); // Track current page

  useEffect(() => {
    if (entities.length === 0) {
      dispatch(getBooks(1)); // Fetch books for the current page
    }
  }, [dispatch, entities.length]); // Run effect when page changes

  // Filtered posts based on search keyword
  const filteredPosts = entities
    .slice(0, 10) // Display only the first 10 books
    .filter((post) =>
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

  return (
    <>
      <div className="grid justify-center">
        <img src="/bookImg.png" alt="Book not found" />
      </div>

      <div className="flex justify-center items-center mt-5 space-x-0">
        <input
          type="text"
          value={searchKeyword} // Bind the search keyword to the input field
          onChange={handleInputChange} // Update the search keyword on input change
          className="bg-slate-300 w-[800px] h-10 border-none"
          onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
          placeholder="Search for a book..."
        />
        <div className="text-white border border-transparent h-10 px-3 pt-1 cursor-pointer shadow-md bg-blue-700 hover:bg-orange-600">
          <Link to="/allbooks">
            {" "}
            <CiSearch className="h-8 w-8" />
          </Link>
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="dropdown-container"
          style={{
            marginTop: "30px",
            maxHeight: "280px",
            overflowY: "auto",
            textAlign: "center",
          }}
        >
          {filteredPosts.map((post, index) => (
            <p
              key={post.id}
              onClick={() => handleItemClick(post)}
              className="cursor-pointer hover:bg-gray-200"
            >
              {index + 1}. {post.title}
            </p>
          ))}
          <button>
            {" "}
            <Link to="/allbooks">
              <span className="flex ">
                Find More
                <FaArrowRight className="mt-2" />
              </span>
            </Link>{" "}
          </button>
        </div>
      )}
    </>
  );
}

export default Main;
