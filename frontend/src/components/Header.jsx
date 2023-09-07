import React, { useContext } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaAlignJustify,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Header() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CompanyApp</Link>
      </div>
      <ul>
        {currentUser ? (
          <>
            <li>
              <Link to={"/home"}>
                <FaAlignJustify />
                Companies
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"}>
                <FaPlus /> Add New Company
              </Link>
            </li>
            <li>
              <button className="btn" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
