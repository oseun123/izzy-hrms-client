import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Pagination, Select, Card, Skeleton } from 'antd';
import Avatar from 'react-avatar';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import { userhaspermission } from '../../../../../../store/selectors/userSelectors';

import { useGetSystemEmpStatusPaginated } from '../../../../../../store/actions/preferencesHooksActionsType';
import { deleteEmpStatus } from '../../../../../../store/actions/preferencesActions';

import { useMediaQuery } from 'react-responsive';
import { emp_status_columns } from '../../../../../../util/tables';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import NoCustomDataIcon from '../../../../../ui/NoCustomDataIcon';
import { EmployeeStatus } from '../../../../../../@types/api.types';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { AiOutlineCheck } from 'react-icons/ai';
const { Option } = Select;

function ViewEmpStatus() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [emp_status, setEmpStatus] = useState<EmployeeStatus[] | undefined>([]);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemEmpStatusPaginated(
    enabled,
    setEnabled,
    page,
    size,
  );

  const memoUserpermission = useMemo(userhaspermission, []);

  const delete_emp_status = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'DELETE_EMPLOYEE_STATUS'),
    shallowEqual,
  );
  const edit_emp_status = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'EDIT_EMPLOYEE_STATUS'),
    shallowEqual,
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = 'Are you sure you want to delete this employee status?';
  const request = useAxiosPrivate();

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setEmpStatus(data?.payload?.employeeStatus);
    }
  }, [data]);

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
    deleteEmpStatus(dispatch, request, { id }).then((res) => {
      if (res?.status === 'success') {
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
                <h1>View Employee Status</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Employee Status</li>
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
                        <AiOutlineCheck />
                        List of employee status
                      </span>
                    </h3>
                    <div className="card-tools">
                      <GeneralBackButton />
                    </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <>
                        {' '}
                        <Table
                          // @ts-ignore
                          columns={emp_status_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_emp_status,
                            edit_emp_status,
                          )}
                          // @ts-ignore
                          dataSource={emp_status}
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
                                              name={`${user.first_name || ''} ${
                                                user.last_name || ' '
                                              }`}
                                              size="25"
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
                          />{' '}
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

export default ViewEmpStatus;
