import React from "react";
import { MdScreenSearchDesktop } from "react-icons/md";
import { Link } from "react-router-dom";

const WishList = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm mb-16">
        <div className="flex items-center text-blue-500 ">
          <div className="mr-2 text-lg">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="text-lg" />{" "}
        </div>
        <div className="mr-4 text-gray-600 hover:text-blue-600 text-md">
          <Link to="/dashboard">Searchbar</Link>
        </div>
      </nav>
      <div className="text-4xl flex justify-center items-center w-full">
          Wishlist
      </div>
    </div>
  );
};

export default WishList;
