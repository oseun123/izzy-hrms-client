import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card, Skeleton } from "antd";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
  useCleanUp,
} from "../../../../../../hooks";
import {

  system_countrys,
} from "../../../../../../store/selectors/preferencesSelector";
import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemCountryPaginated } from "./../../../../../../store/actions/preferencesHooksActionsType";
import {
  deleteCountry,
} from "../../../../../../store/actions/preferencesActions";

import { useMediaQuery } from "react-responsive";
import { country_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
import GeneralBackButton from "../../../../../ui/GeneralBackButton";
import { User } from "../../../../../../@types/api.types";
import { GoGlobe } from "react-icons/go";

const { Option } = Select;

function ViewCountry() {
  useCleanUp();

  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemCountryPaginated(
    enabled,
    setEnabled,
    page,
    size
  );

 
  const countrys = useShallowEqualSelector(system_countrys);
  const memoUserpermission = useMemo(userhaspermission, []);
  const delete_state = useSelector(
     // @ts-ignore
    (state) => memoUserpermission(state, "DELETE_COUNTRY"),
    shallowEqual
  );
  const edit_state = useSelector(
     // @ts-ignore
    (state) => memoUserpermission(state, "EDIT_COUNTRY"),
    shallowEqual
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = "Delete Country";
  const request = useAxiosPrivate();

 
  function handlePagination(page:number) {
    setPage(page);

    setEnabled(true);
  }
  function handleChange(value:number) {
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id:number) {
    deleteCountry(dispatch, request, { id }).then((res) => {
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
                <h1>View Country</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Country</li>
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
                    <h3 className="card-title">
                      <span className="space__align">
                       <GoGlobe/>
                      Available countries
                      </span>
                      
                      </h3>
                    <div className="card-tools">
                        <GeneralBackButton/>
                      </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <>
                        <Table
                         // @ts-ignore
                          columns={country_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_state,
                            edit_state
                          )}
                           // @ts-ignore
                          dataSource={countrys}
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
                                        {record.users.map((user:User) => (
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
                            rowExpandable: (record) => {
                              return record.users.length > 0;
                            },
                          }}
                          locale={{
                            emptyText: <NoCustomDataIcon />,
                          }}
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

export default ViewCountry;
