import React from "react";
import empty from "../../svg/empty.svg";

function NoCustomDataIcon() {
  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <img src={empty} alt="" width={150} />

      <p>No data available</p>
    </div>
  );
}

export default NoCustomDataIcon;
