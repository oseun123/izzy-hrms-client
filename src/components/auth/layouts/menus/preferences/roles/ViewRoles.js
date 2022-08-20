import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card } from "antd";

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  // spinner_preferences,
  message_preferences,
  status_preferences,
  system_roles,
} from "../../../../../../store/selectors/preferencesSelector";
import { useGetSystemRoles } from "./../../../../../../store/actions/preferencesHooksActions";
import { deleteRole } from "../../../../../../store/actions/preferencesActions";
import Message from "../../../../../helpers/Message";
import { useMediaQuery } from "react-responsive";
import { role_columns } from "./../../../../../../util/tables";
const { Option } = Select;

function ViewRoles() {
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data } = useGetSystemRoles(enabled, setEnabled, page, size);

  // const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const roles = useShallowEqualSelector(system_roles);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = "Are you sure you want to delete this role?";

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    };
  }, [dispatch]);
  function handlePagination(page) {
    setPage(page);
    // setSize(pageSize);
    setEnabled(true);
    // refetch();
  }
  function handleChange(value) {
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id) {
    deleteRole(dispatch, { id });
  }
  return (
    <>
      {/* Content Header (Page header) */}
      <section className="content-header">
        {message && status ? (
          <Message message={message} status={status} />
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>View Roles</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Prefrences</li>
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
                  <h3 className="card-title">System roles</h3>
                </div>
                <div className="card-body">
                  <Table
                    columns={role_columns(
                      isTabletOrMobile,
                      confirm_text,
                      confirmAction
                    )}
                    dataSource={roles}
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
                                <Space wrap>
                                  {record.users.map((user) => (
                                    <span className="badge bg-secondary rounded-pill p-1">
                                      {user.first_name}
                                    </span>
                                  ))}
                                </Space>
                              </Card>
                            </div>
                          ) : null}

                          {record?.permissions?.length ? (
                            <div>
                              <Card
                                size="small"
                                title="Permissions"
                                style={{
                                  margin: 0,
                                }}
                              >
                                <Space wrap>
                                  {record.permissions.map((perm) => (
                                    <span className="badge bg-secondary rounded-pill p-1">
                                      {perm.name}
                                    </span>
                                  ))}
                                </Space>
                              </Card>
                            </div>
                          ) : null}
                        </>
                      ),
                    }}
                  />
                  <div className="mt-3 d-flex justify-content-between">
                    <Pagination
                      total={data?.payload?.total_pages}
                      // showSizeChanger
                      pageSize={1}
                      onChange={handlePagination}
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
    </>
  );
}

export default ViewRoles;
