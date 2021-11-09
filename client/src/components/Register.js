import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "../css/Register.css";
import { BsPersonBoundingBox } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { MdScreenSearchDesktop } from "react-icons/md";

const Register = ({ setAuth }) => {
  const validate = Yup.object({
    username: Yup.string()
      .max(20, "* Username must be between 2-20 characters")
      .min(2, "* Username must be between 2-20 characters")
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
      <div className="p-4 border-b border-gray-300 shadow">
        <div className="text-blue-500 flex items-center text-xl">
          <div className="mr-2">SaversSearch</div> <MdScreenSearchDesktop />
        </div>
      </div>
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
          <div className="flex items-center justify-center">
            <div className="border border-gray-300 rounded max-w-md mt-20 p-8 shadow w-full">
              <div className="text-xl text-blue-500 flex items-center justify-center mb-4">
                <div className="mr-2">Register</div> <BsPersonBoundingBox />
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
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-full px-4 py-2 text-white rounded mt-4 mb-4"
                >
                  Register
                </button>
              </Form>
              <Link
                className="text-blue-500 flex items-center justify-end"
                to="/login"
              >
                <BiLogInCircle className="mr-2" /> <div>Login</div>
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

export default Register;
