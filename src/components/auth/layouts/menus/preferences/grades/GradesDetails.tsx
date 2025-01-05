import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Table } from 'antd';
import { useGetSystemGrade } from '../../../../../../store/actions/preferencesHooksActionsType';
import { capitalizeFirstLetter } from '../../../../../../util/helpers';
import { department_details_columns } from '../../../../../../util/tables';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import NoCustomDataIcon from '../../../../../ui/NoCustomDataIcon';
import { useCleanUp } from '../../../../../../hooks';
import { SiLevelsdotfyi } from 'react-icons/si';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { Grade } from '../../../../../../@types/api.types';

function GradesDetails() {
  useCleanUp();
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);
  const [single_grade, setSingleGrade] = useState<Grade | null>(null);

  const { isLoading, data } = useGetSystemGrade(enabled, setEnabled, 'all');

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const grades = data?.payload?.grades;
      const single_grade = grades?.find((item) => item.id === parseInt(id));

      setSingleGrade(single_grade || null);
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
                <h1>Grade Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences </li>
                  <li className="breadcrumb-item active">Grade </li>
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
                        User(s) in{' '}
                        {single_grade &&
                          capitalizeFirstLetter(single_grade?.name)}{' '}
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
                        // @ts-ignore
                        columns={department_details_columns()}
                        rowKey={(record) => record.id}
                        dataSource={single_grade?.users}
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

export default GradesDetails;
