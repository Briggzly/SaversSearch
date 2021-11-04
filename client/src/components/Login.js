import React, { Fragment, useState} from "react";
import { Link } from "react-router-dom";
import {NotificationManager} from 'react-notifications'
import { BsPersonBoundingBox } from 'react-icons/bs'
import {TiUserAdd} from 'react-icons/ti'
import '../css/Login.css'


const Login = ({ setAuth, setRegister }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  
    setRegister(false)
  

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        NotificationManager.success("Logged in Successfully");
      } else {
        setAuth(false);
        NotificationManager.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className='title'>
      <h1>Login <BsPersonBoundingBox /> </h1>
      </div>
      <form className='logForm' onSubmit={onSubmitForm}>
        <label for='email'>Email</label>
        <input
          type="email"
          name="email"
          id='email'
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <label for='password'>Password</label>
        <input
          type="password"
          name="password"
          id='password'
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
        <button>Submit</button>
      </form>
      <Link id='linkToRegister' to="/register">Register <TiUserAdd /> </Link>
    </Fragment>
  );
};

export default Login;
