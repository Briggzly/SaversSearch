import React, { useState } from "react";
import "../css/Dashboard.css";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react"

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const override = css`
  display: block;
  margin: 0 auto;
`;


  const onSearchSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (term === "") return;

    onSubmit([]);
    setLoading(true);

    const params = {
      api_key: "A68506923CCA420A91D4273D0B7F86D9",
      type: "search",
      amazon_domain: "amazon.com",
      search_term: term,
    };

    await axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((res) => {
        setLoading(false);
        onSubmit(res.data.search_results);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={onSearchSubmit} className="p-4 md:p-0">
        <div className="flex items-center w-full max-w-2xl md:mx-auto">
          <input
            className="w-full px-4 h-12 border border-gray-300 rounded-l outline-none focus:border-gray-400"
            type="text"
            value={term}
            placeholder="Search Here"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded-r h-12 px-4 text-white hover:bg-blue-600"
            type="submit"
          >
            {!loading ? <AiOutlineSend /> : <ClipLoader color={'white'} css={override} size={15}  />}
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default SearchBar;
