import React from "react";

function CompanyNameList({ company = [] }) {
  return (
    <div>
      {company.map((item) => (
        <p key={item.name} className="goal">
          {item.name}{" "}
        </p>
      ))}
    </div>
  );
}

export default CompanyNameList;
