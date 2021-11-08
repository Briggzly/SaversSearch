import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { MdScreenSearchDesktop } from "react-icons/md";
import "../css/Dashboard.css";
import {BsCardChecklist} from 'react-icons/bs'
import { Link } from "react-router-dom";
import SearchBar from './SearchBar'

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

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
    <div>
      <nav className="navbar" >
        <div className="navbar-logo">
          <h1>
            SaversSearch <MdScreenSearchDesktop />{" "}
          </h1>
        </div>
        <div className="navbar-items">
          <h3>Welcome, {name}</h3>
          <div className='savedItems-container'>
              <BsCardChecklist />
              <Link to='/dashboard' id='savedLink'>WishList</Link>
          </div>
          <button onClick={(e) => logout(e)}>Logout</button>
        </div>
      </nav>
      <div className='searchbar-container'>
        <SearchBar id='searchbar' setAuth={setAuth} />
      </div>
    </div>
  );
};

export default Dashboard;
