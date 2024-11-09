import React from "react";
// import { FaDatabase } from "react-icons/fa";
import empty from "../../svg/empty.svg";

function NoCustomDataIcon() {
  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      {/* <FaDatabase size={60} color="#bfbfbf" />  */}

      <img src={empty} alt="" width={150} />

      <p>No data available</p>
    </div>
  );
}

export default NoCustomDataIcon;
