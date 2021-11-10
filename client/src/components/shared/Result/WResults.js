import React from "react";

export default function SearchResult({ product, offers }) {
    return (
      <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
        <img src={product.images} alt={product.title} className="h-12 w-12 object-cover" />
        <div title={product.title} className="text-xs truncate overflow-ellipsis">
          <a href={product.link} target='_blank' rel="noreferrer" className="hover:text-blue-600">{product.title}</a>
        </div>
        <div className="flex items-center w-full mb-12 justify-end text-lg">
        <div className="mr-1">${offers.primary.price}</div>
        </div>
      </div>
    );
  }