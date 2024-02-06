import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IErrorGlobalState } from "../../store/store";
import { AiFillWarning, AiOutlineCloseCircle } from "react-icons/ai";
import Error from "./Error";

import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { BsDoorClosedFill, BsHouseDashFill } from "react-icons/bs";
import Logo from "../../assets/logo.png";
interface Props {}

const Navigation: React.FC<Props> = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [showErrorBar, setShowErrorBar] = useState<boolean>(false);
  const errorList = useSelector((err: IErrorGlobalState) => {
    return err.error;
  });

  useEffect(() => {
    if (errorList.errorMessages.length < 1) {
      setShowErrorBar(false);
    }
  }, [errorList.errorMessages.length]);
  return (
    <div className="mx-auto max-w-7xl lg:border-b-2 xl:border-b-2 md:border-b-2 top-0 z-50 bg-white">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-white"
            >
              {isAuthenticated() && (
                <span
                  className="bg-orange-500 text-white p-2 text-center flex flex-row justify-center items-center font-bold rounded-lg hover:cursor-pointer"
                  onClick={() => {
                    signOut();
                    window.location.reload();
                  }}
                >
                  <BsDoorClosedFill />
                  Odhlášení
                </span>
              )}

              {!isAuthenticated() && (
                <>
                  <li>
                    <Link to="/login">Přihlášení</Link>
                  </li>
                  <li>
                    <Link to="/register">Registrace</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="normal-case text-xl flex flex-row justify-center items-center font-bold ml-5 md:ml-0"
          >
            <img src={Logo} alt="logo" width={50} /> MediTrack
          </Link>
        </div>
        <div className="hidden lg:flex navbar-end">
          {isAuthenticated() && (
            <span
              className="bg-red-800 text-white p-2 text-center flex flex-row justify-center items-center font-bold rounded-lg hover:cursor-pointer"
              onClick={() => {
                signOut();
                window.location.reload();
              }}
            >
              <BsHouseDashFill />
              <span className="ml-2">Odhlášení</span>
            </span>
          )}
          <ul className="menu menu-horizontal px-1">
            {!isAuthenticated() && (
              <>
                <li>
                  <Link to="/login">Přihlášení</Link>
                </li>
                <li>
                  <Link to="/register">Registrace</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {errorList.errorMessages.length > 0 && (
          <div
            className="navbar-end"
            onClick={() => {
              setShowErrorBar(!showErrorBar);
            }}
          >
            {showErrorBar ? (
              <a className="bg-gradient-to-br from-rose-400  to-pink-600 p-1 rounded-full">
                <AiOutlineCloseCircle
                  style={{ color: "white", fontSize: 30 }}
                />
              </a>
            ) : (
              <a className="btn bg-red-300">
                <AiFillWarning style={{ color: "white" }} />
                {errorList.errorMessages.length}
              </a>
            )}
          </div>
        )}
      </div>
      {showErrorBar && errorList.errorMessages.length > 0 && (
        <Error error={errorList} />
      )}
    </div>
  );
};

export default Navigation;
