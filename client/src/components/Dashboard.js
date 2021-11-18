import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { MdScreenSearchDesktop } from "react-icons/md";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AResult from "./Result/AResults";
import WResult from "./Result/WResults";
import { AiFillAmazonCircle } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import apiRequest from "../utils/api";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [wItems, setWItems] = useState([]);

  const getProfile = async () => {
    try {
      const res = await apiRequest("/dashboard", {
        method: "GET",
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  function toFloat(currency) {
    if (!currency) {
      return 0;
    }
    return Number(currency.replace(/[^0-9.-]+/g, ""));
  }

  const filteredResults = items
    .sort((a, b) => toFloat(a.price?.raw) - toFloat(b.price?.raw))
    .filter((item) => item.price);

  const renderedResults = filteredResults.map((i) => {
    return <AResult key={i.uuid} {...i} />;
  });

  const wFilteredResults = wItems
    .sort(
      (a, b) =>
        parseFloat(a.offers.primary.price) - parseFloat(b.offers.primary.price)
    )
    .filter((wItem) => wItem.offers.primary.price);

  const wRenderedResults = wFilteredResults.map((i) => {
    return <WResult key={i.product.item_id} {...i} />;
  });

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      NotificationManager.success("Logout successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex-col">
      <nav className="flex w-full items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm">
        <div className="flex items-center transition text-blue-500 cursor-default">
          <div className="md:mr-2 mr-1 md:text-lg text-sm">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="md:text-lg text-md" />{" "}
        </div>
        <div className="flex items-center md:gap-4 gap-2 text-gray-600">
          <div className="cursor-default text-xs md:text-md  ">Welcome, {name}</div>
          <div className="transition text-xs md:text-md items-center hover:text-blue-600 ">
            <Link to="dashboard/wishlist">WishList</Link>
          </div>
          <button
            onClick={(e) => logout(e)}
            className="bg-blue-500 transition text-white md:px-4 md:py-2 px-2 py-1 text-xs md:text-md rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex-col justify-center items-center w-full mx-auto mt-16">
        <SearchBar onSubmit={setItems} onWSubmit={setWItems} />
        <div className="md:flex justify-center gap-12">
          <div className= "md:max-w-md px-4 md:px-0 md:w-full mb-6 md:mb-0">
            <div className="flex items-center w-full justify-center mb-4 text-xl cursor-default">
              <div>Amazon</div>{" "}
              <AiFillAmazonCircle className="text-yellow-500 ml-1" />
            </div>
            <div className="grid grid-cols-1 w-full gap-4">{renderedResults} </div>
          </div>
          <div className= "md:max-w-md px-4 md:px-0 md:w-full">
            <div className="flex items-center w-full justify-center mb-4 text-xl cursor-default">
              <div>Walmart</div>{" "}
              <BiLoader className="text-yellow-500 ml-1" />
            </div>
            <div className="grid grid-cols-1 w-full gap-4">{wRenderedResults}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
