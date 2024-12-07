import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Pagination, Select, Card, Button, Skeleton } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
  useCleanUp,
} from "../../../../../../hooks";
import {

  system_departments,
} from "../../../../../../store/selectors/preferencesSelector";
import { userhaspermission } from "../../../../../../store/selectors/userSelectors";

import { useGetSystemDepartmentPaginated } from "../../../../../../store/actions/preferencesHooksActionsType";
import {
  deleteDepartment,
} from "../../../../../../store/actions/preferencesActions";

import { useMediaQuery } from "react-responsive";
import { department_columns } from "../../../../../../util/tables";
import { CSVLink } from "react-csv";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import Avatar from "react-avatar";
import styles from "../../../../../styles/layout/Layout.module.css";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import GeneralBackButton from "../../../../../ui/GeneralBackButton";
import { Department, User } from "../../../../../../@types/api.types";

const { Option } = Select;

function ViewDepartments() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [csv_department, setCSVDepartment] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemDepartmentPaginated(
    enabled,
    setEnabled,
    page,
    size
  );


  const departments:Department[] = useShallowEqualSelector(system_departments) as Department[];
  const memoUserpermission = useMemo(userhaspermission, []);
  const delete_dept = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, "DELETE_DEPARTMENT"),
    shallowEqual
  );
  const edit_dept = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, "EDIT_DEPARTMENT"),
    shallowEqual
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = "Delete department";
  const request = useAxiosPrivate();

  useEffect(() => {
    if ( departments && departments?.length) {
      const new_dept:any = [];

      departments?.forEach((item:Department) => {
        new_dept.push({
          Name: item.name,
          // eslint-disable-next-line
          ["Total users"]: item?.users?.length,
        });
      });
      setCSVDepartment(new_dept);
    }
  }, [departments]);

  function handlePagination(page:number) {
    setPage(page);

    setEnabled(true);
  }
  function handleChange(value: number) {
    setSize(value);
    setPage(1);
    setEnabled(true);
  }
  function confirmAction(id: number) {
    deleteDepartment(dispatch, request, { id }).then((res) => {
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
                <h1>View Departments</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Department</li>
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
                       <MdOutlineLocalFireDepartment />

                        Available departments

                      </span>
                      
                      </h3>
                    <div className="card-tools">
                      <Space>
                      <GeneralBackButton/>
                      <CSVLink
                        data={csv_department}
                        filename={"system_departments.csv"}
                      >
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          size="small"
                          className={styles.on_hover}
                        >
                          Export
                        </Button>
                      </CSVLink>

                      </Space>
                    </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <>
                        <Table
                          // @ts-ignore
                          columns={department_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_dept,
                            edit_dept
                          )}
                            // @ts-ignore
                          dataSource={departments}
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
                                      <Space size="middle" wrap>
                                        {record.users.map((user:User) => (
                                          <Space>
                                            <Avatar
                                              size='25'
                                              name={`${user.first_name} ${user.last_name}`}
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

export default ViewDepartments;
