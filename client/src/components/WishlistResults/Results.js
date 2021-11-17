import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { SiPrime } from "react-icons/si";
import { AiFillAmazonCircle } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";

export default function Results({
  wish_title,
  wish_price,
  wish_link,
  wish_prime,
  wish_a,
  deleteItem
}) {


  return (
    <div>
      <div className="flex items-center border border-gray-400 h-20 rounded shadow p-2">
        <div className="flex-col mb-4">
          <div className="mb-1">
            {" "}
            {wish_a ? (
              <div className="flex items-center w-full text-md cursor-default">
                <div>Amazon</div> <AiFillAmazonCircle className="text-yellow-500 ml-1" />
              </div>
            ) : (
              <div className="flex items-center w-full text-md cursor-default">
                <div>Walmart</div> <BiLoader className="text-yellow-500 ml-1" />
              </div>
            )}{" "}
          </div>
          <div className="max-w-sm flex items-center">
            <div
              title={wish_title}
              className="text-xs truncate overflow-ellipsis"
            >
              <a
                href={wish_link}
                target="_blank"
                rel="noreferrer"
                className=" transition hover:text-blue-600"
              >
                {wish_title}
              </a>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="text-lg mb-5 flex w-full justify-end items-center cursor-default">
            <div className="mr-1"> ${wish_price} </div>
            <div className="text-yellow-500">
              {" "}
              {wish_prime ? <SiPrime /> : null}{" "}
            </div>
          </div>
          <button onClick={deleteItem} className="text-red-500 hover:text-red-600 flex justify-end w-full text-lg">
            {" "}
            <MdDeleteForever />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
