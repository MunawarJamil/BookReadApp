import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../Redux/features/UserSlice";

function LogOutUser() {
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate(); // For redirecting

  // Determine if the user is logged in
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout()); // Correctly invoke the logout action
    navigate("/signin"); // Redirect to the sign-in page
  };

  return (
    <div>
      {isLoggedIn ? (
        <p
          className="text-white border pl-2 pb-1 pr-2 cursor-pointer pt-1 shadow-md bg-blue-700 hover:bg-orange-600"
          onClick={handleLogout} // Add onClick handler to trigger logout
        >
          Logout
        </p>
      ) : (
        <p className="text-white border pl-2 pb-1 pr-2 cursor-pointer pt-1 shadow-md bg-blue-700 hover:bg-orange-600">
          <Link to="/signin">Sign In</Link>{" "}
          {/* Redirect to sign-in if not logged in */}
        </p>
      )}
    </div>
  );
}

export default LogOutUser;
