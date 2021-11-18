import React from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import apiRequest from "../../utils/api";
import { NotificationManager } from "react-notifications";

export default function SearchResult({ product, offers }) {
  const bookmarkItem = async () => {
    try {
      await apiRequest("/dashboard/wishlist", {
        body: JSON.stringify({
          title: product.title,
          price: offers.primary.price,
          link: product.link,
          prime: null,
          amazon: false
        }),
        method: "post",
      });

      NotificationManager.success("Item added to Wishlist");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
      <div className="max-w-xs w-60 md:w-full flex items-center gap-2">
        <img
          src={product.images}
          alt={product.title}
          className="md:h-12 md:w-12 h-8 w-8 object-cover"
        />
        <div
          title={product.title}
          className="text-xs truncate overflow-ellipsis"
        >
          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            className=" transition hover:text-blue-600"
          >
            {product.title}
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center w-full mb-5 md:mb-4 justify-end md:text-lg text-md cursor-default">
          <div>${offers.primary.price}</div>
        </div>
        <button
          onClick={bookmarkItem}
          className="flex items-center w-full text-sm md:text-md justify-end"
        >
          <BsBookmarkPlus />
        </button>
      </div>
    </div>
  );
}
