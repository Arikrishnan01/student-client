import React, { useState } from "react";
import "./add.css";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNewData } from "../../config/api";

const InitialObj = {
  name: "",
  email: "",
  phone: "",
  endrollNumber: "",
  dateOfAdmissoin: "",
};

export default function Add() {
  const [formData, setFormData] = useState(InitialObj);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  /** toast fun successful completions */
  const notifySuccess = () =>
    toast.success("Student created successfully", {
      position: "top-end", // Correct way to specify position
      autoClose: 3000,
      isClosable: true,
      closeOnClick: true,
    });

  /** toast for warning  */
  const notifyWarning = () =>
    toast.warn("Please fill all the fields", {
      position: "top-end", // Correct way to specify position
      autoClose: 3000,
      isClosable: true,
      closeOnClick: true,
    });

  /** toast for error */
  const notifyError = () =>
    toast.error("Server Error Check Connections!!!", {
      position: "top-end", // Correct way to specify position
      autoClose: 3000,
      isClosable: true,
      closeOnClick: true,
    });

  const { name, email, phone, endrollNumber, dateOfAdmissoin } = formData;
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
    if (!name || !email || !phone || !endrollNumber || !dateOfAdmissoin) {
      notifyWarning();
      return;
    }
    try {
      const formData = {
        name,
        email,
        phone,
        endrollNumber,
        dateOfAdmissoin
      };
      setLoading(true);
      await createNewData(formData);
      notifySuccess();
      setFormData({
        name: '',
        email: '',
        phone: '',
        endrollNumber: '',
        dateOfAdmissoin: ''
      });
      setLoading(false);
      window.location.href='/home'
    } catch (error) {
      notifyError();
    }
  };

  /** handleCancel fun */
  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      endrollNumber: '',
      dateOfAdmissoin: ''
    });
  };

  return (
    <div className="register-con">
      <div className="register-container">
        <h1 className="register-title"> Add New Student</h1>
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
                Phone
              </label>
              <input
                type="text"
                className="register-form-con-input"
                placeholder="Enter Your Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                EndrollNumber
              </label>
              <input
                type="text"
                className="register-form-con-input"
                placeholder="Enter Your EndrollNumber"
                name="endrollNumber"
                value={formData.endrollNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                DateOfAdmissoin
              </label>
              <input
                type="text"
                className="register-form-con-input"
                placeholder="Enter Your DateOfAdmissoin"
                name="dateOfAdmissoin"
                value={formData.dateOfAdmissoin}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <button type="submit" className="form-submit-btn">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div className="form-items">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
