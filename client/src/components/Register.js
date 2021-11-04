import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import '../css/Register.css'
import { BsPersonBoundingBox } from 'react-icons/bs'
import {BiLogInCircle} from 'react-icons/bi'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'


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
        NotificationManager.success('Register Successful')
      } else {
        setAuth(false);
        NotificationManager.error(parseRes)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const validate = Yup.object({
    username: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid!')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  })

  

  return (
    <Fragment>
      <Formik
        validationSchema={validate}
      >
        {formik => (
          <div>
          <div className='title'>
          <h1>Register <BsPersonBoundingBox /></h1>
          </div>
          <Form className='regForm' onSubmit={onSubmitForm}>
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => onChange(e)}
            />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
            <label for="email">Email</label>
            <input
              type="email"
              id='email'
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label for="password">Password</label>
            <input
              type="password"
              id='password'
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <button>Submit</button>
          </Form>
          <Link className='link' to="/login"><BiLogInCircle /> Login</Link>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

export default Register;
