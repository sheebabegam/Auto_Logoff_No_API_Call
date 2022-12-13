import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter valid email id")
        .strict()
        .trim()
        .required("this field required"),
      password: yup.string().strict().trim().required("this field required"),
    }),

    onSubmit: (data) => {
      console.log(data);
      axios
        .post("http://localhost:4000/api/login", data)
        .then((res) => {
          console.log(res); // Here we get the token in data
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
  });

  return (
    <div>
      <div className="form_div">
        <h1 className="register_heading"> Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formik.email}
            onChange={formik.handleChange}
            className="input_box"
          />
          <br />
          {formik.errors.email ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <br />
          <input
            type="password"
            password="password"
            id="password"
            placeholder="Password"
            value={formik.password}
            onChange={formik.handleChange}
            className="input_box"
          />
          <br />
          {formik.errors.password ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <br />
          <br />
          <button type="submit" className="submit_btn">
            Sign In
          </button>
          <br />
          <br />

          <a
            href="#"
            onClick={() => {
              window.location.href = "register";
            }}
            className="link_login"
          >
            Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
