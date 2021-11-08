import React, { useState } from "react";
import "../css/Dashboard.css";
import { AiOutlineSend } from "react-icons/ai";
import ItemsList from "./ItemsList";
import axios from "axios";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [items, setItems] = useState([])

 
   const onSearchSubmit = async (e) => {
    e.preventDefault()

    const params = {
        api_key: "A68506923CCA420A91D4273D0B7F86D9",
        type: "search",
        amazon_domain: "amazon.com",
        search_term: term,
        sort_by: "price_low_to_high",
      };
  
      await axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((res) => {
          setItems(res.data.search_results)
        }).catch((err) => {
            console.log(err)
        })
   }
  

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input
          className="searchbar-input"
          type="text"
          value={term}
          placeholder="Search Here"
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="searchbar-button" type="submit">
          <AiOutlineSend />
        </button>
      </form>
      <br/>
        {/* <ItemsList items={items}  /> */}
    </div>
  );
};

export default SearchBar;
