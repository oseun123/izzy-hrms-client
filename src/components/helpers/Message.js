import React, { Component } from "react";
import classnames from "classnames";

class Message extends Component {
  state = {
    top: "-300px",
  };
  first = null;
  second = null;
  componentDidMount() {
    this.firstTime();
  }
  firstTime = () => {
    clearTimeout(this.first);
    this.first = setTimeout(() => {
      this.setState({ top: "16px" }, () => this.secondTime());
    }, 100);
  };
  secondTime = () => {
    clearTimeout(this.second);
    this.second = setTimeout(() => {
      this.setState({ top: "-300px" });
    }, 10000);
  };
  componentWillUnmount() {
    clearTimeout(this.second);
    clearTimeout(this.first);
  }

  render() {
    const { status, message } = this.props;

    return (
      <div>
        <div
          className={classnames({
            "alert fade show ": true,
            "d-flex justify-content-between align-items-center": true,
            "trans-mesg ": true,
            "alert-danger": status === "error",
            "alert-success": status === "success",
          })}
          role="alert"
          style={{
            position: "fixed",
            top: this.state.top,
            right: "16px",
            zIndex: 9999999,

            // transition: "all 10s ease"
          }}
        >
          <div className="alert-icon pr-2">
            <i
              style={{
                fontSize: "1.6rem",
              }}
              className={classnames({
                "fas fa-check": status === "success",
                "fas fa-exclamation-triangle": status === "error",
              })}
            ></i>
          </div>
          <div className="alert-text pr-2">{message}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Message.defaultProps = {
  status: "error",
  message: "unknown error occured.",
};
export default Message;
