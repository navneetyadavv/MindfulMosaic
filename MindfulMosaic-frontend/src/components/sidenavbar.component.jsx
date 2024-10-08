import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import { ThemeContext } from "../App";

const SideNav = () => {
  const { theme } = useContext(ThemeContext);
  let {
    userAuth: { access_token, new_notification_available },
  } = useContext(UserContext);

  let page = location.pathname.split("/")[2];

  let [pageState, setPageState] = useState(page.replace("-", " "));
  let [showSideNav, setShowSideNav] = useState(false);

  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let pageStateTap = useRef();

  const chagnePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    console.log(offsetLeft, offsetWidth);
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";

    if (e.target == sideBarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    setShowSideNav(false);
    pageStateTap.current.click();
  }, [pageState]);
  return access_token === null ? (
    <Navigate to="/signin" />
  ) : (
    <>
      <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
        <div className="skicky top-[80px] z-30">
          <div
            className={`relative md:hidden bg-white py-1 border-b  ${
              theme === "dark" ? "border-darkGrey" : "border-lightGrey"
            } flex flex-nowrap overflow-x-auto `}
          >
            <button
              ref={sideBarIconTab}
              className="p-5 capitalize "
              onClick={chagnePageState}
            >
              <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
            </button>
            <button
              ref={pageStateTap}
              className="p-5 capitalize "
              onClick={chagnePageState}
            >
              {pageState}
            </button>

            <hr
              ref={activeTabLine}
              className="absolute bottom-0 duration-500 "
            />
          </div>

          <div
            className={
              "min-w-[200px] h-[calc(100vh-80px-64px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 " +
              (!showSideNav
                ? "max-md:opacity-0 max-md:pointer-events-none"
                : "opacity-100 pointer-events-auto")
            }
          >
            <h1 className="text-xl text-dark-grey mb-2">Dashboard</h1>
            <hr
              className={`-ml-6 mb-3 mr-6 ${
                theme === "dark" ? "border-darkGrey" : "border-lightGrey"
              }`}
            />

            <NavLink
              to={"/dashboard/blogs"}
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-document"></i>
              Blogs
            </NavLink>

            <NavLink
              to={"/dashboard/notifications"}
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="relative">
                <i className="fi fi-rr-bell"></i>
                {new_notification_available && (
                  <span className="bg-red h-2 w-2 rounded-full absolute z-10 top-0 right-0"></span>
                )}
              </div>
              Notification
            </NavLink>

            <NavLink
              to={"/editor"}
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-file-edit"></i>
              Write
            </NavLink>

            <h1 className="text-xl text-dark-grey mb-3 mt-7">Setting</h1>
            <hr
              className={`-ml-6 mb-3 mr-6 ${
                theme === "dark" ? "border-darkGrey" : "border-lightGrey"
              }`}
            />

            <NavLink
              to={"/settings/edit-profile"}
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-user"></i>
              Edit Profile
            </NavLink>

            <NavLink
              to={"/settings/change-password"}
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-lock"></i>
              Change Password
            </NavLink>
          </div>
        </div>
        <div className="max-md:-mt-8 mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SideNav;
