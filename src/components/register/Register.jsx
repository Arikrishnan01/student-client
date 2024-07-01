import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../../config/api";

const InitialObj = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(InitialObj);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /** toast fun successful completions */
  const notifySuccess = () =>
    toast.success("Please fill all the fields", {
      position: "top-end", // Correct way to specify position
      autoClose: 5000,
      isClosable: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  /** toast for warning  */
  const notifyWarning = () =>
    toast.warn("Please fill all the fields", {
      position: "top-end", // Correct way to specify position
      autoClose: 5000,
      isClosable: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  /** toast for error */
  const notifyError = () =>
    toast.error("Server Error Check Connections!!!", {
      position: "top-end", // Correct way to specify position
      autoClose: 5000,
      isClosable: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const { name, email, password } = formData;
  /** handleChange */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /** submithandler for form */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      notifyWarning();
    }
    try {
      const formData = {
        name,
        email,
        password,
      };
      setLoading(true);
      await userRegister(formData);
      notifySuccess();
      setLoading(false);
      navigate("/login");
    } catch (error) {
      notifyError();
    }
  };

  return (
    <div className="register-con">
      <div className="register-container rigister-height">
        <h1 className="register-title">Student Register</h1>
        <div className="register-form-con">
          <form onSubmit={submitHandler}>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                Name
              </label>
              <input
                type="text"
                className="register-form-con-input"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                Email
              </label>
              <input
                type="text"
                className="register-form-con-input"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                Password
              </label>
              <input
                type="password"
                className="register-form-con-input"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <button type="submit" className="form-submit-btn">
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
            <div className="form-items">
              <p className="form-account-p">
                Already have a account?
                <Link to="login">
                  <span className="form-account-span">Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
