import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { AuthContext } from "../context/authContext";

function CompanyList({ company = [], dataUpdate, setEditDataDetails }) {
  const { currentUser } = useContext(AuthContext);

  const handelDelete = async (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        token: "Bearer " + currentUser.token,
      },
    };

    try {
      const response = await axios.delete(`/company/${id}`, config);
      if (response.data) {
        toast.success(response.data.success.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dataUpdate();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <div className="goal">
        <h2>Name: {company.name}</h2>
        <h2>Email: {company.email}</h2>
        <h2>Phone Number: {company.phoneNumber}</h2>
        <h2>Founded Year: {company.foundedYear}</h2>
        <div className="company-div">
          <button
            className="btn"
            onClick={() => {
              setEditDataDetails(company);
            }}
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={() => {
              handelDelete(company._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
