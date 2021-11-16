import React, { useEffect, useState } from "react";
import { MdScreenSearchDesktop } from "react-icons/md";
import { Link } from "react-router-dom";
import apiRequest from "../utils/api";
import Results from "./WishlistResults/Results";

const WishList = () => {
  const [wishItem, setWishItem] = useState([]);

  const getWishlist = async () => {
    try {
      const res = await apiRequest("/dashboard/wishlist", {
        method: "GET",
      });

      const parseData = await res.json();
      setWishItem(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const renderedResults = wishItem.map((i) => {
    return <Results key={i.wish_id} {...i} />;
  });

  useEffect(() => {
    getWishlist();
  }, [wishItem]);

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm mb-16">
        <div className="flex items-center text-blue-500 cursor-default">
          <div className="mr-2 text-lg">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="text-lg" />{" "}
        </div>
        <div className="mr-4 transition text-gray-600 hover:text-blue-600 text-md">
          <Link to="/dashboard">Searchbar</Link>
        </div>
      </nav>
      <div className="text-4xl flex justify-center items-center w-full mb-12 cursor-default">
        Wishlist
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 w-full gap-4 max-w-lg">
          {renderedResults}
        </div>
      </div>
    </div>
  );
};

export default WishList;
