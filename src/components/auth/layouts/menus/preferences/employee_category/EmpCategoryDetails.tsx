import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Table } from 'antd';
import { useGetSystemEmpCategory } from '../../../../../../store/actions/preferencesHooksActionsType';
import { capitalizeFirstLetter } from '../../../../../../util/helpers';
import { department_details_columns } from '../../../../../../util/tables';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import NoCustomDataIcon from '../../../../../ui/NoCustomDataIcon';
import { useCleanUp } from '../../../../../../hooks';
import { FaGraduationCap } from 'react-icons/fa6';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { EmployeeCategory } from '../../../../../../@types/api.types';

function EmpCategoryDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);
  const [single_emp_cat, setSingleEmpCat] = useState<EmployeeCategory | null>(
    null,
  );
  useCleanUp();

  const { isLoading, data } = useGetSystemEmpCategory(
    enabled,
    setEnabled,
    'all',
  );

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const employeeCategory = data?.payload?.employeeCategory;
      const single_cat = employeeCategory?.find(
        (item) => item.id === parseInt(id),
      );

      setSingleEmpCat(single_cat || null);
    }
  }, [data, id]);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Employee Category Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences </li>
                  <li className="breadcrumb-item active">Employee Category </li>
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
                        <FaGraduationCap />
                        User(s) in{' '}
                        {single_emp_cat &&
                          capitalizeFirstLetter(single_emp_cat?.name)}{' '}
                      </span>
                    </h3>
                    <div className="card-tools ">
                      <GeneralBackButton />
                    </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <Table
                        //@ts-ignore
                        columns={department_details_columns()}
                        rowKey={(record) => record.id}
                        dataSource={single_emp_cat?.users}
                        scroll={{
                          x: 786,
                        }}
                        locale={{ emptyText: <NoCustomDataIcon /> }}
                      />
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

export default EmpCategoryDetails;
