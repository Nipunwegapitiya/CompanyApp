import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";

function NewCompanyForm({ editDataDetails, setEditDataDetails, fetchData }) {
  const { currentUser } = useContext(AuthContext);
  const [formDate, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    foundedYear: "",
  });

  useEffect(() => {
    if (editDataDetails == null) {
      return;
    }

    setFormData(editDataDetails);
  }, []);

  const navigate = useNavigate();

  const { name, email, phoneNumber, foundedYear } = formDate;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
        token: "Bearer " + currentUser.token,
      },
    };

    try {
      let response;
      if (editDataDetails == null) {
        response = await axios.post("/company/", formDate, config);
      } else {
        response = await axios.put(
          `/company/${editDataDetails._id}`,
          formDate,
          config
        );
        setEditDataDetails(null);
        fetchData();
      }
      if (response.data.status) {
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

        navigate("/home");
      }
    } catch (error) {
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
    <section className="form">
      <p className="ptext">Please take a moment to fill out the form below.</p>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your company name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your company email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Enter your company phone number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="foundedYear"
            name="foundedYear"
            value={foundedYear}
            placeholder="Enter your company founded year"
            onChange={onChange}
            min="1800"
            step="1"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewCompanyForm;
