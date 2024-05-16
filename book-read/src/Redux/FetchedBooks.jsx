// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "./features/BookSlice";

// function FetchedBooks() {
//   const dispatch = useDispatch();
//   const { entities, loading } = useSelector((state) => state.books);

//   useEffect(() => {
//     dispatch(getBooks());
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Blog Posts</h2>
//       {entities.map((post, index) => (
//         <p key={post.id}>
//           {index + 1}. {post.title}

//         </p>
//       ))}
//     </div>
//   );
// }

// export default FetchedBooks;
