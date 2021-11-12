import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function Results({ wish_title, wish_price, wish_link }) {
  return (
    <div>
      <div className="flex items-center border border-gray-400 h-20 rounded shadow p-2">
        <div className="max-w-sm">
          <div
            title={wish_title}
            className="text-xs truncate overflow-ellipsis"
          >
            <a
              href={wish_link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              {wish_title}
            </a>
          </div>
        </div>
        <div className="w-full">
          <div className="text-lg mb-5 flex w-full justify-end">
            ${wish_price}
          </div>
          <button className="text-red-500 hover:text-red-600 flex justify-end w-full text-lg">
            {" "}
            <MdDeleteForever />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
