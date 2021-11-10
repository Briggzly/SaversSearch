import React from "react";
import {SiPrime} from 'react-icons/si'

export default function SearchResult({ image, title, price, is_prime, link }) {
  return (
    <div className="flex gap-2 border border-gray-400 shadow w-full h-20 items-center p-2 rounded">
      <img src={image} alt={title} className="h-12 w-12 object-cover" />
      <div title={title} className="text-xs truncate overflow-ellipsis">
        <a href={link} target='_blank' rel="noreferrer" className="hover:text-blue-600">{title}</a>
      </div>
      <div className="flex items-center w-full mb-12 justify-end text-lg">
      <div className="mr-1">{price?.raw}</div>
      <div className="text-yellow-500">{is_prime? <SiPrime /> : null}</div>
      </div>
    </div>
  );
}
