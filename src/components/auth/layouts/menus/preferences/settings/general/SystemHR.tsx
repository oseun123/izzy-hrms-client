import React, { useEffect, useState } from 'react';
import { Select, Skeleton, Button } from 'antd';
import { useGetSystemUsers } from '../../../../../../../store/actions/preferencesHooksActionsType';
import {
  useAxiosPrivate,
  useShallowEqualSelector,
} from '../../../../../../../hooks';
import { useDispatch } from 'react-redux';
import { updateCurrentUserSettings } from '../../../../../../../store/actions/userActions';
import { current_cleint } from '../../../../../../../store/selectors/userSelectors';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FormOutlined } from '@ant-design/icons';
import { User, CurrentClient } from '../../../../../../../@types/api.types';

const { Option } = Select;

function SystemHR() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [systemHR, setSystemHR] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<string>('');

  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const currentCleint = useShallowEqualSelector(
    current_cleint,
  ) as CurrentClient | null;

  const { data: user_data, isLoading: user_loading } = useGetSystemUsers(
    enabled,
    setEnabled,
  );

  // Set initial settings from current client
  useEffect(() => {
    if (currentCleint && currentCleint.settings) {
      setSettings(currentCleint.settings);
    }
  }, [currentCleint]);

  // Set initial system HR value
  useEffect(() => {
    if (currentCleint && settings) {
      const current_settings = JSON.parse(settings);
      const currentSystemHR = current_settings[0]?.general?.system_hr_id;
      setSystemHR(currentSystemHR || null);
    }
  }, [currentCleint, settings]);

  // Update settings when system HR changes
  useEffect(() => {
    if (settings && systemHR !== null) {
      const current_settings = JSON.parse(settings);
      current_settings[0].general = {
        ...current_settings[0].general,
        system_hr_id: systemHR,
      };
      setSettings(JSON.stringify(current_settings));
    }
  }, [systemHR, settings]);

  function handleUpdateSettings(): void {
    setLoading(true);
    updateCurrentUserSettings(dispatch, request, { settings }).then((res) => {
      setLoading(false);
      if (res.status === 'success') {
        setEnabled(true);
      }
    });
  }

  function handleSystemHRChange(value: number): void {
    setSystemHR(value);
  }

  return (
    <>
      <div className="col-md-6">
        {/* Main content */}
        <section className="content col-md-12">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between">
                <h3 className="card-title">
                  <span className="space__align">
                    <HiOutlineUserGroup />
                    System HR Settings
                  </span>
                </h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {user_loading ? (
                <Skeleton active />
              ) : (
                <>
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <label className="text-bold-500">System HR</label>
                      <small className="d-none d-sm-block">
                        Select the employee who will serve as the system HR
                        administrator
                      </small>
                    </div>
                    <span style={{ width: '300px' }}>
                      <Select
                        placeholder="Select System HR"
                        value={systemHR}
                        onChange={handleSystemHRChange}
                        style={{ width: '100%' }}
                        showSearch
                        filterOption={(input, option) => {
                          if (!option?.children) return false;
                          return (
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                      >
                        {user_data?.payload?.system_users?.map((user: User) => (
                          <Option key={user.id} value={user.id}>
                            {user.first_name} {user.last_name} - {user.email}
                          </Option>
                        ))}
                      </Select>
                    </span>
                  </div>

                  <div className="row mt-3">
                    <div className="form-group col-md-6">
                      <Button
                        type="primary"
                        icon={<FormOutlined />}
                        loading={loading}
                        onClick={handleUpdateSettings}
                        disabled={!systemHR}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default SystemHR;
