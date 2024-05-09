import React, { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  // console.log("header called");
  const [btnname, setButtonName] = useState("Login");
  const OnlineStatus = useOnlineStatus();
  useEffect(() => {
    console.log("useeffect called");
  }, []);

  return (
    <>
      <div className="flex justify-between bg-pink-200 shadow-lg mb-2">
        <div className="logo-container">
          <img className="w-36" src={LOGO_URL} />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className=" px-4">
              Online Status: {OnlineStatus ? "✅" : "🔴"}
            </li>
            <li className=" px-4">
              <Link to="/">Home</Link>
            </li>
            <li className=" px-4">
              <Link to="/about">About</Link>
            </li>
            <li className=" px-4">
              <Link to="/contact">Contact </Link>
            </li>
            <li className=" px-4">Cart</li>
            <button
              className="login"
              onClick={() => {
                btnname === "login"
                  ? setButtonName("logout")
                  : setButtonName("login");
              }}
            >
              {btnname}
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
