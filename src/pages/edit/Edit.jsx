import React, { useEffect, useState } from "react";
import "./edit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GLOBAL_URL } from "../../config/api";
import { useParams } from "react-router-dom";
import axios from "axios";


const InitialObj = {
  name: "",
  email: "",
  phone: "",
  endrollNumber: "",
  dateOfAdmissoin: "",
};

export default function Edit() {
  const [formData, setFormData] = useState(InitialObj);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();


  /** toast fun successful completions */
  const notifySuccess = () =>
    toast.success("Student updated successfully", {
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

  // getData ById:
  const getById = () => {
    axios.get(`${GLOBAL_URL}/student/${id}`)
    .then((response) => {
        setFormData(response.data.data);
    })
    .catch((error) => {
        console.log(`Error : ${error.message}`);
})
}

// getById();
useEffect(() => {
  getById();
},[])

const submitHandler = async(e) => {
    e.preventDefault();
  
    const updateById = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        endrollNumber: formData.endrollNumber,
        dateOfAdmissoin: formData.dateOfAdmissoin
    }
    setLoading(true)
    fetch(`${GLOBAL_URL}/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateById),
      })
      .then((response) => response.json())
      .then((data) => {
        notifySuccess();
        window.location.href = "/home";
      })
    .catch((error) => {
        notifyError();
        console.log(`Error : ${error.message}`);
    })
  }
  

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
        <h1 className="register-title"> Edit Student</h1>
        <div className="register-form-con">
          <form onSubmit={submitHandler}>
            <div className="form-items">
              <label htmlFor="" className="register-form-con-lbl">
                Name
              </label>
              <input
                type="text"
                className="register-form-con-input"
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
                name="dateOfAdmissoin"
                value={formData.dateOfAdmissoin}
                onChange={handleChange}
              />
            </div>
            <div className="form-items">
              <button type="submit" className="form-submit-btn">
                {loading ? "Loading..." : "Update"}
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
