import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Pagination, Select, Card, Skeleton } from 'antd';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  useShallowEqualSelector,
  useAxiosPrivate,
  useCleanUp,
} from '../../../../../../hooks';
import {
  // spinner_preferences,

  system_companys,
} from '../../../../../../store/selectors/preferencesSelector';
import { userhaspermission } from '../../../../../../store/selectors/userSelectors';

import { useGetSystemCompanyPagination } from '../../../../../../store/actions/preferencesHooksActionsType';
import { deleteCompany } from '../../../../../../store/actions/preferencesActions';

import { useMediaQuery } from 'react-responsive';
import { company_columns } from '../../../../../../util/tables';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import NoCustomDataIcon from '../../../../../ui/NoCustomDataIcon';
import { FaBuilding } from 'react-icons/fa6';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { Branch } from '../../../../../../@types/api.types';

const { Option } = Select;

function ViewCompanys() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSystemCompanyPagination(
    enabled,
    setEnabled,
    page,
    size,
  );

  const companys = useShallowEqualSelector(system_companys);
  const memoUserpermission = useMemo(userhaspermission, []);
  const delete_company = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'DELETE_COMPANY'),
    shallowEqual,
  );
  const edit_company = useSelector(
    // @ts-ignore
    (state) => memoUserpermission(state, 'EDIT_COMPANY'),
    shallowEqual,
  );

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const confirm_text = 'Delete Company';
  const request = useAxiosPrivate();

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
    deleteCompany(dispatch, request, { id }).then((res) => {
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
                <h1>View Company</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                  <li className="breadcrumb-item active">Company</li>
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
                        <FaBuilding />
                        Available companies
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
                        <Table
                          // @ts-ignore
                          columns={company_columns(
                            isTabletOrMobile,
                            confirm_text,
                            confirmAction,
                            delete_company,
                            edit_company,
                          )}
                          // @ts-ignore
                          dataSource={companys}
                          rowKey={(record) => record.id}
                          scroll={{
                            x: 786,
                          }}
                          pagination={false}
                          expandable={{
                            expandedRowRender: (record) => (
                              <>
                                {record.branches.length ? (
                                  <div className="mb-3">
                                    <Card
                                      size="small"
                                      title="Branches"
                                      style={{
                                        margin: 0,
                                      }}
                                    >
                                      <Space wrap>
                                        {record.branches.map(
                                          (branch: Branch) => (
                                            <span className="badge bg-secondary rounded-pill p-1">
                                              {branch.name}
                                            </span>
                                          ),
                                        )}
                                      </Space>
                                    </Card>
                                  </div>
                                ) : null}
                              </>
                            ),
                            rowExpandable: (record) => {
                              return record.branches.length > 0;
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

export default ViewCompanys;
