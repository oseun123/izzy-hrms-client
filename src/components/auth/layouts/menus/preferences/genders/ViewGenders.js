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
  system_genders,
} from "../../../../../../store/selectors/preferencesSelector";
import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemGender } from "./../../../../../../store/actions/preferencesHooksActions";
import {
  deleteGender,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import Message from "../../../../../helpers/Message";
import { useMediaQuery } from "react-responsive";
import { gender_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
const { Option } = Select;

function ViewGenders() {
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data } = useGetSystemGender(enabled, setEnabled, page, size);

  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const genders = useShallowEqualSelector(system_genders);
  const memoUserpermission = useMemo(userhaspermission, []);
  const delete_gender = useSelector(
    (state) => memoUserpermission(state, "DELETE_GENDER"),
    shallowEqual
  );
  const edit_gender = useSelector(
    (state) => memoUserpermission(state, "EDIT_GENDER"),
    shallowEqual
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = "Are you sure you want to delete this gender?";
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
    deleteGender(dispatch, request, { id }).then((res) => {
      if (res?.status === "success") {
        setEnabled(true);
      }
    });
  }
  return (
    <>
      <PreferencesHero />
      {/* Content Header (Page header) */}
      <section className="content-header">
        {message && status ? (
          <Message message={message} status={status} />
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>View Gender</h1>
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
                  <h3 className="card-title">System genders</h3>
                </div>
                <div className="card-body">
                  <Table
                    columns={gender_columns(
                      isTabletOrMobile,
                      confirm_text,
                      confirmAction,
                      delete_gender,
                      edit_gender
                    )}
                    dataSource={genders}
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

export default ViewGenders;
