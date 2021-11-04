import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Register = ({setAuth}) => {
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
        setAuth(true);
        toast.success('Register Successfully')
      } else {
        setAuth(false);
        toast.error(parseRes)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
        <button>Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
