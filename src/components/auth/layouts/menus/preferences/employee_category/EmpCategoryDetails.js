import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton, Table } from "antd";
import { useGetSystemEmpCategory } from "./../../../../../../store/actions/preferencesHooksActions";
import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { department_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
import { useCleanUp, usePreferenceNotification } from "../../../../../../hooks";

function EmpCategoryDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);
  const [single_emp_cat, setSingleEmpCat] = useState(null);
  useCleanUp();
  usePreferenceNotification();

  const { isLoading, data } = useGetSystemEmpCategory(enabled, setEnabled);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const employeeCategory = data?.payload?.employeeCategory;
      const single_cat = employeeCategory.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      setSingleEmpCat(single_cat);
    }
  }, [data, id]);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Employee Category Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences </li>
                  <li className="breadcrumb-item active">Employee Category </li>
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
                    <h3 className="card-title">
                      User(s) in{" "}
                      {single_emp_cat &&
                        capitalizeFirstLetter(single_emp_cat?.name)}{" "}
                    </h3>
                    <div className="card-tools ">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        data-toggle="tooltip"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <Table
                        columns={department_details_columns()}
                        rowKey={(record) => record.id}
                        dataSource={single_emp_cat?.users}
                        scroll={{
                          x: 786,
                        }}
                        locale={{ emptyText: <NoCustomDataIcon /> }}
                      />
                    )}
                  </div>
                  {/* /.card-body */}

                  {/* /.card-footer*/}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default EmpCategoryDetails;
