import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CompanyList from "./../components/CompanyList";
import NewCompanyForm from "../components/NewCompanyForm";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [companyData, setCompanyData] = useState([]);
  const [editDataDetails, setEditDataDetails] = useState(null);

  const navigate = useNavigate();

  async function fetchData() {
    const config = {
      headers: {
        "content-type": "application/json",
        token: "Bearer " + currentUser.token,
      },
    };

    try {
      const response = await axios.get("/company", config);
      if (response.data) {
        setCompanyData(response.data);
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
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    fetchData();
  }, []);
  return (
    <div>
      {editDataDetails !== null ? (
        <NewCompanyForm
          editDataDetails={editDataDetails}
          setEditDataDetails={setEditDataDetails}
          fetchData={fetchData}
        />
      ) : (
        companyData.map((item, index) => (
          <CompanyList
            key={index}
            company={item}
            dataUpdate={fetchData}
            setEditDataDetails={setEditDataDetails}
          />
        ))
      )}
    </div>
  );
}

export default Home;
