import React from "react";
import classnames from "classnames";

const Spinner = ({ size, position, color, spinner, ...others }) => {
  let style = null;

  const className = classnames({
    ...others,
    "kt-section__content": true,
    "text-right": position === "right",
    "d-flex justify-content-center align-items-center": position === "center",
    "text-left": position === "left",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-success": color === "success",
    "text-danger": color === "danger",
    "text-warning": color === "warning",
    "text-info": color === "info",
    "text-light": color === "light",
    "text-dark": color === "dark",
    "d-visible": spinner,
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
        <div className="spinner-border" role="status" style={style}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
};

Spinner.defaultProps = {
  size: "small",
  position: "right",
  color: "warning",
};

export default Spinner;
