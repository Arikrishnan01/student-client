import React, { useEffect, useState } from "react";
import "./home.css";
import dp_img from "../../assests/dp-2.jfif";
import { useNavigate } from "react-router-dom";
import { GLOBAL_URL, getAllData } from "../../config/api";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import moment from "moment";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);
  // const {id} = useParams();


  /** fetch students data */
  const fetchAllData = async () => {
    const response = await getAllData();
    setUserData(response.data.data);
    // console.log(response.data.data);
  };

  /** useEffect avoid the side effects */
  useEffect(() => {
    fetchAllData();
  }, []);

  /** handle navigates */
  const handleNavigate = () => {
    navigate("/student/add");
  };

  /** handle search */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /** filter user data based on search term */
  const filteredUserData = userData.filter((row) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(searchStr) ||
      row.email.toLowerCase().includes(searchStr) ||
      row.phone.toLowerCase().includes(searchStr) ||
      row.endrollNumber.toLowerCase().includes(searchStr) ||
      moment(row.dateOfAdmissoin)
        .format("DD-MMM, YYYY")
        .toLowerCase()
        .includes(searchStr)
    );
  });

    /** handle delete */
    // const handleDelete = (id) => {
    //   setDeleteId(id);
    //   setShowModal(true);
    // };
  
    // const confirmDelete = () => {
    //   axios
    //     .delete(`${GLOBAL_URL}/student/${deleteId}`)
    //     .then(() => {
    //       fetchAllData();
    //       setShowModal(false);
    //     });
    // };
  
    // const cancelDelete = () => {
    //   setShowModal(false);
    //   window.location.href='/home'
    // };

  return (
    <div className="home-container">
      <div className="home-left">
        <div className="home-left-con">
          <img src={dp_img} alt="" className="home-img" />
          <div className="home-left-text">
            <p>
              Yellow Owl <br />
              <span>Admin</span>
            </p>
          </div>
        </div>
      </div>
      <div className="home-right">
        <div className="home-header">
          <h2>Student Management</h2>
        </div>
        <div className="home-content">
          <div className="home-content-top">
            <h2 className="home-title">Students</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="home-search"
            />
            <button onClick={handleNavigate} className="home-add-student">
              Add New Student
            </button>
          </div>
          <div className="home-data-views">
            {
              <div className="home-contents">
                <table className="custom-table">
                  <thead className="table-header">
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>ENROLL NUMBER</th>
                      <th>DATE OF ADMISSION</th>
                      <th>UPDATE</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUserData.length > 0 &&
                      filteredUserData.map((row) => (
                        <tr key={row._id}>
                          <td>{row.name}</td>
                          <td>{row.email}</td>
                          <td>{row.phone}</td>
                          <td>{row.endrollNumber}</td>
                          <td>
                            {moment(row.dateOfAdmissoin).format("DD-MMM, YYYY")}
                          </td>
                          <td>
                            <button
                              className="tableEmpedit"
                              onClick={() => navigate(`/student/${row._id}`)}
                            >
                              <FaEdit
                                style={{ marginRight: "8px", color: "blue" }}
                              />
                            </button>
                          </td>
                          <td>
                            <button
                              className="tableEmpeDelete"
                              onClick={() => {
                                axios
                                  .delete(`${GLOBAL_URL}/student/${row._id}`)
                                  .then(() => window.confirm('Do you want to delete this item?'))
                                  .then(() => fetchAllData());
                              }}
                            >
                              <FaTrashAlt
                                style={{ marginRight: "8px", color: "red" }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
