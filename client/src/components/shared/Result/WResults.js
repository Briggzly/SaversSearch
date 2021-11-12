import React from "react";
import {BsBookmarkPlus} from 'react-icons/bs'
import apiRequest from "../../../utils/api";

export default function SearchResult({ product, offers }) {

  const bookmarkItem = async () => {
    try {
        await apiRequest("/dashboard/wishlist", {
         body: JSON.stringify({
           title: product.title,
           price: offers.primary.price
         }),
         method: "post"
       });

    } catch (err) {
      console.error(err.message);
    }
  }

    return (
      <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
        <div className="max-w-xs flex items-center gap-2">
        <img src={product.images} alt={product.title} className="h-12 w-12 object-cover" />
        <div title={product.title} className="text-xs truncate overflow-ellipsis">
          <a href={product.link} target='_blank' rel="noreferrer" className="hover:text-blue-600">{product.title}</a>
        </div>
        </div>
        <div className="w-full">
        <div className="flex w-full items-center justify-end text-lg mb-4">
        <div>${offers.primary.price}</div>
        </div>
        <button onClick={bookmarkItem} className="flex items-center w-full justify-end"><BsBookmarkPlus /></button>
        </div>
      </div>
    );
  }