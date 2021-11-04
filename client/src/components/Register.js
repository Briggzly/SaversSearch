import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import '../css/Register.css'
import { BsPersonBoundingBox } from 'react-icons/bs'
import {BiLogInCircle} from 'react-icons/bi'


const Register = ({setRegister}) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { username, email, password };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken)
        setRegister(true);
        NotificationManager.success('Register Successful')
      } else {
        setRegister(false);
        NotificationManager.error(parseRes)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  

  return (
    <Fragment>
      <div className='title'>
      <h1>Register <BsPersonBoundingBox /></h1>
      </div>
      <form className='regForm' onSubmit={onSubmitForm}>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => onChange(e)}
          required
        />
        <label for="email">Email</label>
        <input
          type="email"
          id='email'
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id='password'
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
        <button>Submit</button>
      </form>
      <Link className='link' to="/login"><BiLogInCircle /> Login</Link>
    </Fragment>
  );
};

export default Register;
