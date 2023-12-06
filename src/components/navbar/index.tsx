"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import getUser from "@/app/api/getCurrentUser";

const NavBar = () => {
  const [userDetails, setUser] = useState(null);
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const userString = await getUser();
      const user = JSON.parse(userString);

      setUser(user);
    };

    getUserDetails();
  }, [userDetails]);

  return (
    <div className="navbar bg-base-100 max-w-screen w-screen p-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Pricing</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl ">JaggleAi</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Pricing</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!userDetails ? (
          <Link
            href={"/auth/login"}
            className="btn bg-yellow-300 text-black rounded-[5px] px-10 hover:text-white hover:bg-transparent hover:border-2 hover:border-yellow-300"
          >
            Get Started
          </Link>
        ) : (
          <div className="avatar">
            <div
              onClick={() => {
                signOut(() => router.push("/"));
                setUser(null);
              }}
              className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
