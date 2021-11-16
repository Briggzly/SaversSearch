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
      <div className="p-4 border-b border-gray-300 shadow">
        <div className="text-blue-500 flex items-center text-xl">
          <div className="mr-2">SaversSearch</div> <MdScreenSearchDesktop />{" "}
        </div>
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

            const response = await fetch(
              `${process.env.REACT_APP_API_BASE_URI}/auth/login`,
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              }
            );

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
          <div className="flex items-center justify-center">
            <div className="md:border border-gray-300 rounded mt-20 p-8 md:shadow w-full max-w-md">
              <div className="text-xl text-blue-500 flex items-center justify-center mb-4">
                <div className="flex items-center text-xl">
                  <div className="mr-2">Login</div> <BsPersonBoundingBox />{" "}
                </div>
              </div>
              <Form className="logForm mb-4">
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
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-full px-4 py-2 text-white rounded mt-4"
                >
                  Login
                </button>
              </Form>
              <Link
                to="/register"
                className="text-blue-500 flex items-center justify-end hover:text-blue-600"
              >
                <div className="mr-1">Register</div> <TiUserAdd />{" "}
              </Link>
            </div>
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
