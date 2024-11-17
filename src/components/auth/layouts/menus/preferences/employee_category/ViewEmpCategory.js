import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card, Skeleton } from "antd";
import Avatar from "react-avatar";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  useAxiosPrivate,
  useCleanUp,
  usePreferenceNotification,
} from "../../../../../../hooks";

import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemEmpCategory } from "./../../../../../../store/actions/preferencesHooksActions";
import { deleteEmpCat } from "../../../../../../store/actions/preferencesActions";

import { useMediaQuery } from "react-responsive";
import { emp_category_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
const { Option } = Select;

function ViewEmpCategory() {
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [emp_cat, setEmpCat] = useState([]);

  useCleanUp();
  usePreferenceNotification();

  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemEmpCategory(
    enabled,
    setEnabled,
    page,
    size
  );

  //   const genders = useShallowEqualSelector(system_genders);
  const memoUserpermission = useMemo(userhaspermission, []);

  const delete_emp_cat = useSelector(
    (state) => memoUserpermission(state, "DELETE_EMPLOYEE_CATEGORY"),
    shallowEqual
  );
  const edit_emp_cat = useSelector(
    (state) => memoUserpermission(state, "EDIT_EMPLOYEE_CATEGORY"),
    shallowEqual
  );
  console.log({ emp_cat, data });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text =
    "Are you sure you want to delete this employee category?";
  const request = useAxiosPrivate();

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setEmpCat(data?.payload?.employeeCategory);
    }
  }, [data]);

  function handlePagination(page) {
    setPage(page);

    setEnabled(true);
  }
  function handleChange(value) {
    console.log({ value });
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id) {
    deleteEmpCat(dispatch, request, { id }).then((res) => {
      if (res?.status === "success") {
        setEnabled(true);
      }
    });
  }
  return (
    <>
      <PreferencesHero />

      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>View Employee Category</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Employee Category</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content col-md-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* Default box */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List of employee categories</h3>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <>
                        {" "}
                        <Table
                          columns={emp_category_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_emp_cat,
                            edit_emp_cat
                          )}
                          dataSource={emp_cat}
                          rowKey={(record) => record.id}
                          scroll={{
                            x: 786,
                          }}
                          pagination={false}
                          expandable={{
                            expandedRowRender: (record) => (
                              <>
                                {record.users.length ? (
                                  <div className="mb-3">
                                    <Card
                                      size="small"
                                      title="Users"
                                      style={{
                                        margin: 0,
                                      }}
                                    >
                                      <Space wrap size="middle">
                                        {record.users.map((user) => (
                                          <Space>
                                            <Avatar
                                              name={`${user.first_name || ""} ${
                                                user.last_name || " "
                                              }`}
                                              size={25}
                                              round={true}
                                            />
                                            <span>
                                              {user.first_name} {user.last_name}
                                            </span>
                                          </Space>
                                        ))}
                                      </Space>
                                    </Card>
                                  </div>
                                ) : null}
                              </>
                            ),
                            rowExpandable: (record) => {
                              return record.users.length > 0;
                            },
                          }}
                          locale={{ emptyText: <NoCustomDataIcon /> }}
                        />
                        <div className="mt-3 d-flex justify-content-between">
                          <Pagination
                            total={data?.payload?.total_pages}
                            // showSizeChanger
                            pageSize={1}
                            onChange={handlePagination}
                            current={page}
                            // pageSizeOptions={[2, 10, 20, 50, 100]}
                          />{" "}
                          <Select
                            defaultValue={size}
                            style={{
                              width: 80,
                            }}
                            onChange={handleChange}
                          >
                            <Option value="10">10/page</Option>
                            <Option value="20">20/page</Option>
                            <Option value="50"> 50/page</Option>
                            <Option value="100">100/page</Option>
                          </Select>
                        </div>
                      </>
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

export default ViewEmpCategory;
