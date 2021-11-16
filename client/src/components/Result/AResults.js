import React from "react";
import { SiPrime } from "react-icons/si";
import { BsBookmarkPlus } from "react-icons/bs";
import apiRequest from "../../utils/api";
import { NotificationManager } from "react-notifications";

export default function SearchResult({ image, title, price, is_prime, link }) {
  const bookmarkItem = async () => {
    try {
        await apiRequest("/dashboard/wishlist", {
         body: JSON.stringify({
           title: title,
           price: price.value,
           link: link,
           prime: is_prime,
           amazon: true
         }),
         method: "post"
       });

       NotificationManager.success("Item added to Wishlist")

    } catch (err) {
      console.error(err.message)
      NotificationManager.error("Couldn't add item to Wishlist");
    }
  }

  return (
    <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
      <div className="max-w-xs flex items-center gap-2">
        <img src={image} alt={title} className="h-12 w-12 object-cover" />
        <div title={title} className="text-xs truncate overflow-ellipsis">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-600"
          >
            {title}
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center w-full mb-5 justify-end text-lg cursor-default">
          <div className="mr-1">{price?.raw}</div>
          <div className="text-yellow-500">{is_prime ? <SiPrime /> : null}</div>
        </div>
        <button onClick={bookmarkItem} className="flex items-center w-full justify-end">
          <BsBookmarkPlus />
        </button>
      </div>
    </div>
  );
}
