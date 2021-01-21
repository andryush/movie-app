import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="wrapper d-flex justify-content-center align-items-center">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
export default Spinner;
