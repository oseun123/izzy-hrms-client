import React from "react";
import classnames from "classnames";

const Spinner = ({ size, position, ...others }) => {
  let style = null;

  const className = classnames({
    ...others,
    "kt-section__content": true,
    "text-right": position === "right",
    "d-flex justify-content-center align-items-center": position === "center",
    "text-left": position === "left",
  });
  if (size === "large") {
    style = {
      width: "3rem",
      height: "3rem",
    };
  }

  return (
    <React.Fragment>
      <div className={className}>
        <div className="spinner-border spinner-color" role="status" style={style}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
};

// Spinner.defaultProps = {
//   size: "small",
//   position: "right",
//   color: "warning",
// };

export default Spinner;
