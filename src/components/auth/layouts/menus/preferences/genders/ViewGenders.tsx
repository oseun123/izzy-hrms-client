import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card, Skeleton } from "antd";
import Avatar from "react-avatar";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
} from "../../../../../../hooks";
import {
  // spinner_preferences,
  system_genders,
} from "../../../../../../store/selectors/preferencesSelector";
import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemGenderPaginated } from "../../../../../../store/actions/preferencesHooksActionsType";
import {
  deleteGender,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";

import { useMediaQuery } from "react-responsive";
import { gender_columns } from "../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
import { User } from "../../../../../../@types/api.types";

const { Option } = Select;

function ViewGenders() {
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemGenderPaginated(
    enabled,
    setEnabled,
    page,
    size
  );

  const genders = useShallowEqualSelector(system_genders);
  const memoUserpermission = useMemo(userhaspermission, []);


  const delete_gender = useSelector(
      // @ts-ignore
    (state) => memoUserpermission(state, "DELETE_GENDER"),
    shallowEqual
  );
  const edit_gender = useSelector(
      // @ts-ignore
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
  function handlePagination(page: number) {
    setPage(page);

    setEnabled(true);
  }
  function handleChange(value: number) {
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id: number) {
    deleteGender(dispatch, request, { id }).then((res) => {
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
                <h1>View Gender</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Gender</li>
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
                    <h3 className="card-title">System genders</h3>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <>
                      
                        <Table
                        // @ts-ignore
                          columns={gender_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_gender,
                            edit_gender
                          )}
                          // @ts-ignore
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
                                      <Space wrap size="middle">
                                        {record.users.map((user:User) => (
                                          <Space>
                                            <Avatar
                                              name={`${user.first_name || ""} ${
                                                user.last_name || " "
                                              }`}
                                              size="22"
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
                            current={page}
                            pageSize={1}
                            onChange={handlePagination}
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

export default ViewGenders;
