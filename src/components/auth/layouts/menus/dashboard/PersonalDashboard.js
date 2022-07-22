import React, { useState } from "react";
import { UseRefreshTest } from "../../../../../store/actions/userHooksActions";

function PersonalDashboard() {
  const [enabled, setEnabled] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    refetch();
  }
  const { refetch } = UseRefreshTest(enabled, setEnabled);
  return (
    <>
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Fixed Layout</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href={() => false}>Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href={() => false}>Layout</a>
                </li>
                <li className="breadcrumb-item active">Fixed Layout</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Title</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                      data-toggle="tooltip"
                      title="Remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <button onClick={handleClick}>click</button>
                  Start creating your amazing application!
                </div>
                {/* /.card-body */}
                <div className="card-footer">Footer</div>
                {/* /.card-footer*/}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </>
  );
}

export default PersonalDashboard;
