import React, { useEffect, useState } from "react";
import { Radio, Space, Button } from "antd";
import styles from "../../../../../styles/layout/Layout.module.css";
import { FormOutlined } from "@ant-design/icons";
import { useAxiosPrivate } from "../../../../../../hooks";

import { useDispatch } from "react-redux";

import $ from "jquery";

import { updateCurrentUserSettings } from "../../../../../../store/actions/userActions";

const navbar_dark_skins = [
  "sidebar-dark-primary",
  "sidebar-dark-info",
  "sidebar-dark-success",
  "sidebar-dark-danger",
  "sidebar-dark-indigo",
  "sidebar-dark-purple",
  "sidebar-dark-pink",
  "sidebar-dark-navy",
  "sidebar-dark-lightblue",
  "sidebar-dark-teal",
  "sidebar-dark-warning",
  "sidebar-dark-orange",
  "sidebar-dark-fuchsia",
  "sidebar-dark-maroon",
  "sidebar-dark-lime",
  "sidebar-dark-olive",
  "sidebar-dark-secondary",
];
const navbar_light_skins = [
  "sidebar-light-primary",
  "sidebar-light-info",
  "sidebar-light-success",
  "sidebar-light-danger",
  "sidebar-light-indigo",
  "sidebar-light-purple",
  "sidebar-light-pink",
  "sidebar-light-navy",
  "sidebar-light-lightblue",
  "sidebar-light-teal",
  "sidebar-light-warning",
  "sidebar-light-orange",
  "sidebar-light-fuchsia",
  "sidebar-light-maroon",
  "sidebar-light-lime",
  "sidebar-light-olive",
  "sidebar-light-secondary",
];

function DarkSideBarVariant({ currentCleint, setEnabled }) {
  const dispatch = useDispatch();
  const resquest = useAxiosPrivate();
  const init_settings = currentCleint?.settings;

  const [side_dark_variant, setSideDarkVariant] = useState(
    JSON.parse(init_settings)[0]?.display?.sidebar_variant
  );

  const [spinner, setSpinner] = useState(false);
  const [settings, setSettings] = useState(init_settings);

  function onChangeSideBarDark(e) {
    const selected_color = e.target.value;

    const sidebar = $(".main-sidebar");
    const sidebar_all_skin = navbar_light_skins.concat(navbar_dark_skins);
    sidebar_all_skin.map((skin) => sidebar.removeClass(skin));

    sidebar.addClass(selected_color);

    setSideDarkVariant(selected_color);
  }

  useEffect(() => {
    if (settings) {
      const current_settings = [...JSON.parse(settings)];
      current_settings[0].display = {
        ...current_settings[0].display,
        sidebar_variant: side_dark_variant,
      };
      setSettings(JSON.stringify(current_settings));
    }
  }, [side_dark_variant, settings]);

  useEffect(() => {
    const current_settings = currentCleint?.settings;
    setSideDarkVariant(
      JSON.parse(current_settings)[0]?.display?.sidebar_variant
    );
  }, [currentCleint]);

  function handleUpdateSettings(e) {
    setSpinner(true);

    updateCurrentUserSettings(dispatch, resquest, { settings }).then((res) => {
      setSpinner(false);
      if (res.status === "success") setEnabled(true);
    });
  }

  return (
    <>
      <div className="col-md-6">
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dark Sidebar Variants</h3>
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
            <div className="card-body">
              <div className="d-flex flex-wrap mb-3">
                <Radio.Group
                  onChange={onChangeSideBarDark}
                  value={side_dark_variant}
                >
                  <Space wrap>
                    <Radio value="sidebar-dark-primary">
                      <div
                        className="bg-primary elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-warning">
                      <div
                        className="bg-warning elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-info">
                      <div
                        className="bg-info elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-danger">
                      <div
                        className="bg-danger elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-success">
                      <div
                        className="bg-success elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-indigo">
                      <div
                        className="bg-indigo elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-lightblue">
                      <div
                        className="bg-lightblue elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-navy">
                      <div
                        className="bg-navy elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-purple">
                      <div
                        className="bg-purple elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-fuchsia ">
                      <div
                        className="bg-fuchsia elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-pink ">
                      <div
                        className="bg-pink elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-maroon ">
                      <div
                        className="bg-maroon elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-orange ">
                      <div
                        className="bg-orange elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-lime">
                      <div
                        className="bg-lime elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-teal">
                      <div
                        className="bg-teal elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-olive">
                      <div
                        className="bg-olive elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                    <Radio value="sidebar-dark-secondary">
                      <div
                        className="bg-secondary elevation-2"
                        style={{
                          width: 40,
                          height: 20,
                          borderRadius: 25,
                          marginRight: 10,
                          marginBottom: -3,
                          opacity: "0.8",
                          cursor: "pointer",
                        }}
                      />
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>

              <div className="row mt-3">
                <div className="form-group col-md-6 ">
                  <Space>
                    <Button
                      type="primary"
                      icon={<FormOutlined />}
                      loading={spinner}
                      onClick={handleUpdateSettings}
                      className={styles.on_hover}
                    >
                      {" "}
                      Update
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
      </div>
    </>
  );
}

export default DarkSideBarVariant;
