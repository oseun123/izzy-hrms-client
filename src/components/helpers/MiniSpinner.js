import React from "react";
import classnames from "classnames";

const MiniSpinner = ({ color, spinner, ...rest }) => {
  return (
    <div
      // className="spinner-border spinner-border-sm text-warning mt-2"
      className={classnames({
        ...rest,
        "spinner-border spinner-border-sm mt-2 ml-1": true,
        "text-white": color === "white",
        "text-warning": color === "warning",
        "d-visible": spinner,
      })}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

MiniSpinner.defaultProps = {
  color: "warning",
};

export default MiniSpinner;
