import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 3.0.5
        </div>
        <strong>
          Copyright © 2014-2019 <Link to={() => false}> Izzy hrms V.1.00</Link>.
        </strong>{" "}
        All rights reserved.
      </footer>

      {/* Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
    </>
  );
}
export default Footer;
