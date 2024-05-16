import React from "react";
import { useParams, useLocation } from "react-router-dom";

function BookClicked() {
  const { id } = useParams(); // Retrieve the route parameter
  const location = useLocation(); // Access data passed during navigation

  // Check if book data is available in location state
  const book = location.state ? location.state.book : null;

  if (!book) {
    return <div>Book details not found</div>; // Fallback when book data is missing
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <img
        className="mt-10 w-[150px] h-[200px] mx-auto" // Book image styling
        src={book.imageUrl} // Display book image
        alt={book.title}
      />
      <h1 className="text-2xl mt-4"> Book Id : {book.id}</h1>
      {book.rating && <p className="text-lg mt-2">Rating: {book.rating}</p>}
      <p className="mt-2">{book.description}</p>{" "}
      <h2 className="text-xl mt-2">Description : </h2>
      <h2 className="text-xl mt-2">Title : {book.title}</h2>
      <p className="text-xl mt-4">{book.body}</p>
      {/* Display book description */}
      {/* Add any other additional information you want to display, such as publication year, review count, etc. */}
    </div>
  );
}

export default BookClicked;
