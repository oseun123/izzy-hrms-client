import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card } from "antd";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
} from "../../../../../../hooks";
import {
  // spinner_preferences,
  message_preferences,
  status_preferences,
  system_branchs,
} from "../../../../../../store/selectors/preferencesSelector";
import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemBranch } from "../../../../../../store/actions/preferencesHooksActions";
import {
  deleteBranch,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import Message from "../../../../../helpers/Message";
import { useMediaQuery } from "react-responsive";
import { branch_columns } from "../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";

import LetteredAvatar from "react-lettered-avatar";

import { arrayWithColors } from "../../../../../../util/helpers";
import AminatedLayout from "../../../../../ui/AminatedLayout";
const { Option } = Select;

function ViewBranch() {
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data } = useGetSystemBranch(enabled, setEnabled, page, size);

  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const companys = useShallowEqualSelector(system_branchs);
  const memoUserpermission = useMemo(userhaspermission, []);
  const delete_branch = useSelector(
    (state) => memoUserpermission(state, "DELETE_BRANCH"),
    shallowEqual
  );
  const edit_branch = useSelector(
    (state) => memoUserpermission(state, "EDIT_BRANCH"),
    shallowEqual
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = "Delete Branch";
  const request = useAxiosPrivate();

  useEffect(() => {
    return () => {
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);
  function handlePagination(page) {
    setPage(page);

    setEnabled(true);
  }
  function handleChange(value) {
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id) {
    deleteBranch(dispatch, request, { id }).then((res) => {
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
          {message && status ? (
            <Message message={message} status={status} />
          ) : null}
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>View Branch</h1>
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
                    <h3 className="card-title">System branches</h3>
                  </div>
                  <div className="card-body">
                    <Table
                      columns={branch_columns(
                        isTabletOrMobile,
                        confirm_text,
                        confirmAction,
                        delete_branch,
                        edit_branch
                      )}
                      dataSource={companys}
                      rowKey={(record) => record.id}
                      scroll={{
                        x: 786,
                      }}
                      pagination={false}
                      expandable={{
                        expandedRowRender: (record) => (
                          <>
                            {record.managers.length ? (
                              <div className="mb-3">
                                <Card
                                  size="small"
                                  title="Branch managers"
                                  style={{
                                    margin: 0,
                                  }}
                                >
                                  <Space wrap size="middle">
                                    {record.managers.map((manager) => (
                                      <Space>
                                        <LetteredAvatar
                                          name={`${manager.first_name || ""} ${
                                            manager.last_name || " "
                                          }`}
                                          size={22}
                                          backgroundColors={arrayWithColors}
                                        />
                                        <span>
                                          {manager.first_name}{" "}
                                          {manager.last_name}
                                        </span>
                                      </Space>
                                    ))}
                                  </Space>
                                </Card>
                              </div>
                            ) : null}
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
      </AminatedLayout>
    </>
  );
}

export default ViewBranch;
