import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BsPersonBoundingBox } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import "../css/Login.css";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { MdScreenSearchDesktop } from "react-icons/md";

const Login = ({ setAuth }) => {
  const validate = Yup.object({
    email: Yup.string()
      .email("* Email is invalid!")
      .required("* Email is required"),
    password: Yup.string()
      .min(6, "* Password must be at least 6 characters")
      .required("* Password is required"),
  });

  return (
    <Fragment>
      <div className="logo-container">
        <h1 id="logo">
          SaversSearch <MdScreenSearchDesktop />{" "}
        </h1>
      </div>
      <Formik
        validationSchema={validate}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            let { email, password } = values;

            const response = await fetch("http://localhost:5000/auth/login", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
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
        }}
      >
        {(formik) => (
          <div>
            <div className="title">
              <h1>
                Login <BsPersonBoundingBox />{" "}
              </h1>
            </div>
            <Form className="logForm">
              <TextField
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <button type="submit">Login</button>
            </Form>
            <Link id="linkToRegister" to="/register">
              Register <TiUserAdd />{" "}
            </Link>
          </div>
        )}
      </Formik>
      {/* <div>
        <img src="" alt="Sign up"></img>
      </div> */}
    </Fragment>
  );
};

export default Login;
