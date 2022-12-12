import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      consfirmpassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().strict().trim().required("this field required"),
      email: yup
        .string()
        .email("Enter valid email id")
        .strict()
        .trim()
        .required("this field required"),
      password: yup.string().strict().trim().required("this field required"),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null, "must be same"])
        .required("this field is required"),
    }),

    onSubmit: (data) => {
      console.log(data);
      axios
        .post("http://localhost:4000/api/register", data)
        .then((res) => {
          toast.success("User register successfully!");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
      // toast.success("Success Notification!", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    },
  });

  return (
    <div>
      <h1 className="register_heading"> Register</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form_row">
          <label htmlFor="name" className="input_label">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            value={formik.name}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.name ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <div className="form_row">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.email}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.email ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <div className="form_row">
          <label htmlFor="password" className="input_label">
            Password
          </label>
          <input
            type="password"
            password="password"
            id="password"
            value={formik.password}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.password ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <div className="form_row">
          <label htmlFor="confirmpassword" className="input_label">
            confirm Password
          </label>
          <input
            type="confirmpassword"
            confirmpassword="confirmpassword"
            id="confirmpassword"
            value={formik.confirmpassword}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.confirmpassword ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.confirmpassword}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <br />
        <br />
        <div>
          <button type="submit" className="submit_btn">
            Sign In
          </button>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a
            href="#"
            onClick={() => {
              window.location.href = "/";
            }}
            className="link_login"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
