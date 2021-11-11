import React from "react";
import { SiPrime } from "react-icons/si";
import { BsBookmarkPlus } from "react-icons/bs";

export default function SearchResult({ image, title, price, is_prime, link }) {
  return (
    <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
      <div className="max-w-xs flex items-center gap-2">
        <img src={image} alt={title} className="h-12 w-12 object-cover" />
        <div title={title} className="text-xs truncate overflow-ellipsis">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600"
          >
            {title}
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center w-full mb-5 justify-end text-lg">
          <div className="mr-1">{price?.raw}</div>
          <div className="text-yellow-500">{is_prime ? <SiPrime /> : null}</div>
        </div>
        <button className="flex items-center w-full justify-end">
          <BsBookmarkPlus />
        </button>
      </div>
    </div>
  );
}
