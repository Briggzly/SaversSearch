import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { MdScreenSearchDesktop } from "react-icons/md";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AResult from "./shared/Result/AResults";
import WResult from "./shared/Result/WResults";
import { AiFillAmazonCircle } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [wItems, setWItems] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
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
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm">
        <div className="flex items-center text-blue-500">
          <div className="mr-2 text-lg">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="text-lg" />{" "}
        </div>
        <div className="flex items-center gap-4">
          <h3>Welcome, {name}</h3>
          <div className="flex-col items-center">
            <Link to="/dashboard">WishList</Link>
          </div>
          <button
            onClick={(e) => logout(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex-col justify-center items-center w-full mx-auto mt-16">
        <SearchBar onSubmit={setItems} onWSubmit={setWItems} />
        <div className="flex justify-center gap-10">
          <div className= "max-w-md">
            <div className="flex items-center w-full justify-center mb-4 text-xl">
              <div>Amazon</div>{" "}
              <AiFillAmazonCircle className="text-yellow-500 ml-1" />
            </div>
            <div className="grid grid-cols-1 w-full gap-4">{renderedResults}</div>
          </div>
          <div className= "max-w-md">
            <div className="flex items-center w-full justify-center mb-4 text-xl">
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
