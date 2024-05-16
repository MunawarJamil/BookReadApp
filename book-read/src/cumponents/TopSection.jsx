import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import LogOutUser from "./LogOutUser";
import { useSelector } from "react-redux";

export default function TopSection() {
  const [users, setUsers] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <div className="w-full h-16  bg-blue-600  flex items-center justify-between  p-5">
        <div className=" text-white mt-1 ">
          <GiHamburgerMenu className=" " />
        </div>
        <div className="flex justify-between pr-2   gap-5">
          <p className=" text-white border pl-2 pr-2 cursor-pointer pt-1 pb-1 shadow-md bg-blue-700 hover:bg-orange-600">
            <Link to="/">Home</Link>
          </p>

          {isLoggedIn ? (
            <p>
              <LogOutUser />
            </p>
          ) : (
            <p className=" text-white border pl-2 pb-1 pr-2 cursor-pointer pt-1 shadow-md bg-blue-700 hover:bg-orange-600">
              <Link to="signin">SignIn</Link>
            </p>
          )}
        </div>
      </div>

      <div>
        {users.map((user) => {
          return (
            <div>
              <p>{user.email}</p>
              <p>{user.password};</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
