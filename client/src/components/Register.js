import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "../css/Register.css";
import { BsPersonBoundingBox } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./TextField";

const Register = ({ setAuth }) => {
  const validate = Yup.object({
    username: Yup.string()
      .max(20, "* Username must be 20 characters or less")
      .required("* Username is required"),
    email: Yup.string()
      .email("* Email is invalid!")
      .required("* Email is required"),
    password: Yup.string()
      .min(6, "* Password must be at least 6 characters")
      .required("* Password is required"),
  });

  return (
    <Fragment>
      <Formik
        validationSchema={validate}
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            let { username, email, password } = values;

            const response = await fetch(
              "http://localhost:5000/auth/register",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
              }
            );
            const parseRes = await response.json();

            if (parseRes.jwtToken) {
              localStorage.setItem("token", parseRes.jwtToken);
              setAuth(true);
              NotificationManager.success("Register Successful");
            } else {
              setAuth(false);
              NotificationManager.error(parseRes);
            }
          } catch (err) {
            console.log(err.message);
          }
        }}
      >
        {(formik) => (
          <div>
            <div className="title">
              <h1>
                Register <BsPersonBoundingBox />
              </h1>
            </div>
            <Form className="regForm">
              <TextField
                label="Username"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <TextField
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="is-invalid"
              />
              <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <button>Submit</button>
            </Form>
            <Link className="link" to="/login">
              <BiLogInCircle /> Login
            </Link>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

export default Register;
