import React from "react";
import { useDispatch } from "react-redux";
import { incrementPage } from "../Redux/features/BookSlice";

const LoadMoreButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(incrementPage()); // Dispatch the incrementPage action
  };

  return <button onClick={handleClick}> </button>;
};

export default LoadMoreButton;
