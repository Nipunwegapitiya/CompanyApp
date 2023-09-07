import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import CompanyNameList from "../components/CompanyNameList";

function Welcome() {
  const [companyNameList, setCompanyNameList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      try {
        const response = await axios.get("/company/names", config);
        if (response.data) {
          setCompanyNameList(response.data);
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
    fetchData();
  }, []);

  return (
    <div>
      <section className="heading">
        <h1>Welcome to CompanyApp</h1>
        <h5 className="ptext">
          We are pleased to introduce our list of registered companies.
        </h5>

        <CompanyNameList company={companyNameList} />
      </section>
    </div>
  );
}

export default Welcome;
