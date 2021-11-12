import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function Results({ wish_title, wish_price }) {
  return (
    <div>
      <div className="flex items-center border border-gray-400 h-20 rounded shadow p-2">
        <div title={wish_title} className="text-xs truncate overflow-ellipsis w-full">{wish_title}</div>
        <div>
          <div className="text-lg mb-5">${wish_price}</div>
          <button className="text-red-500 hover:text-red-600 flex justify-end w-full text-lg">
            {" "}
            <MdDeleteForever />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
