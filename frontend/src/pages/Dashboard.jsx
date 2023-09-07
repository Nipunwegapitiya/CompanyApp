import React, { useContext, useEffect } from "react";
import NewCompanyForm from "../components/NewCompanyForm";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>Welcome {currentUser.name}</h1>
      <NewCompanyForm />
    </div>
  );
}

export default Dashboard;
