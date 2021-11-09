import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { MdScreenSearchDesktop } from "react-icons/md";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Result from "./shared/Result";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

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
    <div className="flex-column">
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-300 shadow h-12 text-sm">
        <div className="flex items-center text-blue-500">
          <div className="mr-2 text-lg">SaversSearch</div>{" "}
          <MdScreenSearchDesktop className="text-lg" />{" "}
        </div>
        <div className="flex items-center gap-4">
          <h3>Welcome, {name}</h3>
          <div className="flex-col items-center gap-2">
            <Link to="/dashboard">Wish list</Link>
          </div>
          <button
            onClick={(e) => logout(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="w-full max-w-2xl mx-auto mt-16">
        <SearchBar onSubmit={setItems} />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {items.map((i) => {
            return <Result key={i.asin} {...i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
