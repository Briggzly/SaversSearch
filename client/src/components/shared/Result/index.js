import React from "react";

export default function SearchResult({ image, title, price }) {
  return (
    <div className="flex gap-2">
      <img src={image} alt={title} className="h-12 w-12 object-cover" />
      <div title={title} className="text-xs truncate">
        {title}
      </div>
      <div>{price?.raw}</div>
    </div>
  );
}
