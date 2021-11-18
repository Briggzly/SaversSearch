import React, { useEffect, useState } from "react";
import { MdScreenSearchDesktop } from "react-icons/md";
import { Link } from "react-router-dom";
import apiRequest from "../utils/api";
import Results from "./WishlistResults/Results";
import NotificationManager from "react-notifications/lib/NotificationManager";

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

  const deleteItem = id => async () => {
    try {
      await apiRequest(`/dashboard/wishlist/${id}`, {
        method: "delete",
      })

      NotificationManager.success("Item removed from Wishlist")
      setWishItem(wishItem.filter(i => i.wish_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const renderedResults = wishItem.map((i) => {
    return <Results key={i.wish_id} {...i} deleteItem={deleteItem(i.wish_id)} />;
  });

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <nav className="flex w-full items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm mb-16">
        <div className="flex items-center text-blue-500 cursor-default">
          <div className="md:mr-2 mr-1 md:text-lg text-sm">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="md:text-lg text-md" />{" "}
        </div>
        <div className="mr-4 transition text-gray-600 hover:text-blue-600 md:text-md text-xs">
          <Link to="/dashboard">Searchbar</Link>
        </div>
      </nav>
      <div className="md:text-4xl text-2xl flex justify-center items-center w-full md:mb-12 mb-6 cursor-default">
        Wishlist
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 w-full px-4 md:px-0 gap-4 max-w-lg">
          {renderedResults}
        </div>
      </div>
    </div>
  );
};

export default WishList;
