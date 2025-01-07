import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Pagination, Select, Card, Skeleton } from 'antd';
import Avatar from 'react-avatar';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import { userhaspermission } from '../../../../../../store/selectors/userSelectors';

import { deleteStep } from '../../../../../../store/actions/preferencesActions';

import { useMediaQuery } from 'react-responsive';
import { step_columns } from './../../../../../../util/tables';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import NoCustomDataIcon from '../../../../../ui/NoCustomDataIcon';
import { useGetSystemStepPaginated } from '../../../../../../store/actions/preferencesHooksActionsType';
import { Step, User } from '../../../../../../@types/api.types';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { SiLevelsdotfyi } from 'react-icons/si';
const { Option } = Select;

function ViewSteps() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [steps, setSteps] = useState<Step[] | undefined>([]);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemStepPaginated(
    enabled,
    setEnabled,
    page,
    size,
  );

  //   const genders = useShallowEqualSelector(system_genders);
  const memoUserpermission = useMemo(userhaspermission, []);

  const delete_grade = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'DELETE_STEPS'),
    shallowEqual,
  );
  const edit_grade = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'EDIT_STEPS'),
    shallowEqual,
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = 'Are you sure you want to delete this step?';
  const request = useAxiosPrivate();

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setSteps(data?.payload?.steps);
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
    deleteStep(dispatch, request, { id }).then((res) => {
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
                <h1>View Steps</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Steps</li>
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
                        <SiLevelsdotfyi />
                        Available steps
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
                          columns={step_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_grade,
                            edit_grade,
                          )}
                          // @ts-ignore
                          dataSource={steps}
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
                                        {record.users.map((user: User) => (
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

export default ViewSteps;
