import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import cartPic from "../../Assets/images/register.jpg";
import * as Yup from "yup";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setloading] = useState(false);
  const [apiError, setapiError] = useState(null);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setapiError(err.response.data.message);
        setloading(false);
      });
    if (data.message == "success") {
      setloading(false);
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min lenth is 3")
      .max(10, "max lenth is 10"),
    email: Yup.string().required("email is Required").email("invalid email"),
    password: Yup.string()
      .required("password is Required")
      .matches(/^[A-z][\w @]{5,8}$/, "invalid password Ex(Ahmed123)"),
    rePassword: Yup.string()
      .required("rePassword is Required")
      .oneOf([Yup.ref("password")], "password and repassword doesn't match"),
    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyptian number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  // ###############################################################################################################################

  return (
    <>
      <div className="row mt-5 py-4">
        <div className="col-md-12">
          <div className="header-content">
            <h2 className="text-center ">Register</h2>
          </div>
        </div>
      </div>
      <div className="row mt-2 border rounded w-50 p-4 mx-auto">
        <div className="col-md-6 ">
          <div className="register-content  ">
            <h3 className="h5 mb-3">Fill Your information</h3>
            <form onSubmit={formik.handleSubmit}>
              {apiError ? (
                <div className="alert alert-danger"> {apiError}</div>
              ) : (
                ""
              )}
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                name="name"
                className="w-100 mt-3 form-control"
                placeholder="Your Full Name"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-100 mt-3 form-control"
                placeholder="Your Email"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                autoComplete="off"
                id="password"
                name="password"
                className="w-100 mt-3 form-control"
                placeholder="Your Password"
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                autoComplete="off"
                id="rePassword"
                name="rePassword"
                className="w-100 mt-3 form-control"
                placeholder=" RePassword"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                id="phone"
                name="phone"
                className="w-100 mt-3 form-control"
                placeholder="Your Phone"
              />
              {loading ? (
                <button
                  type="button"
                  className="btn bg-main text-light ms-4 mt-3 w-75  "
                >
                  <Hourglass
                    visible={true}
                    height="15"
                    width="15"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#FFF", "#721ed"]}
                  />
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-light ms-4 mt-3 w-75  "
                >
                  Register Now
                </button>
              )}
              <button className="btn btn-outline-info ms-4 mt-2  w-75 ">
                <Link to={"/login"}>login Now</Link>
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="right-img">
            <img
              src={cartPic}
              className="w-100 mx-auto py-3"
              alt="shopping cart"
            />
          </div>
        </div>
      </div>
    </>
  );
}
