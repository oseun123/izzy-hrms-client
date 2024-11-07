import React, { useEffect, useState } from "react";

import { Radio, Space, Button } from "antd";
import styles from "../../../../../styles/layout/Layout.module.css";
import $ from "jquery";
import { FormOutlined } from "@ant-design/icons";
import { useAxiosPrivate } from "../../../../../../hooks";

import { useDispatch } from "react-redux";
import { updateCurrentUserSettings } from "../../../../../../store/actions/userActions";

const navbar_dark_skins = [
  "navbar-primary",
  "navbar-secondary",
  "navbar-info",
  "navbar-success",
  "navbar-danger",
  "navbar-maroon",
  "navbar-indigo",
  "navbar-purple",
  "navbar-pink",
  "navbar-navy",
  "navbar-lightblue",
  "navbar-teal",
  "navbar-cyan",
  "navbar-dark",
  "navbar-gray-dark",
  "navbar-gray",
  "navbar-fuchsia",
];

const navbar_light_skins = [
  "navbar-light",
  "navbar-warning",
  "navbar-white",
  "navbar-orange",
];

function NavBarVariant({ currentCleint, setEnabled }) {
  const dispatch = useDispatch();
  const resquest = useAxiosPrivate();

  const init_settings = currentCleint?.settings;
  const [nav_variant, setNavVariant] = useState(
    JSON.parse(init_settings)[0]?.display?.navbar_variant?.nav_variant ||
      "navbar-white"
  );
  const [nav_variant_bg, setNavVariantBG] = useState(
    JSON.parse(init_settings)[0]?.display?.navbar_variant?.nav_variant_bg ||
      "navbar-light"
  );
  const [spinner, setSpinner] = useState(false);
  const [settings, setSettings] = useState(init_settings);

  function onChangeNavbar(e) {
    const selected_color = e.target.value;
    const main_header = $(".main-header");
    main_header.removeClass("navbar-dark").removeClass("navbar-light");

    const navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins);
    navbar_all_colors.map((color) => main_header.removeClass(color));

    if (navbar_dark_skins.includes(selected_color)) {
      main_header.addClass("navbar-dark");
      setNavVariantBG("navbar-dark");
    } else {
      main_header.addClass("navbar-light");
      setNavVariantBG("navbar-light");
    }

    main_header.addClass(selected_color);

    setNavVariant(selected_color);
  }

  useEffect(() => {
    if (settings) {
      const current_settings = [...JSON.parse(settings)];
      // console.log(current_settings);
      current_settings[0].display = {
        ...current_settings[0].display,
        navbar_variant: {
          nav_variant_bg,
          nav_variant,
        },
      };
      setSettings(JSON.stringify(current_settings));
    }
  }, [nav_variant, nav_variant_bg, settings]);

  function handleUpdateNavVariant(e) {
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
              <h3 className="card-title">Navbar Variants</h3>
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
                <Radio.Group onChange={onChangeNavbar} value={nav_variant}>
                  <Space wrap>
                    <Radio value="navbar-primary">
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

                    <Radio value="navbar-secondary">
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

                    <Radio value="navbar-info">
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

                    <Radio value="navbar-success">
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

                    <Radio value="navbar-danger">
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
                    <Radio value="navbar-maroon">
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

                    <Radio value="navbar-indigo">
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

                    <Radio value="navbar-purple">
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

                    <Radio value="navbar-fuchsia">
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

                    <Radio value="navbar-pink">
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

                    <Radio value="navbar-navy">
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

                    <Radio value="navbar-lightblue">
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

                    <Radio value="navbar-teal">
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

                    <Radio value="navbar-cyan">
                      <div
                        className="bg-cyan elevation-2"
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

                    <Radio value="navbar-dark">
                      <div
                        className="bg-dark elevation-2"
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

                    <Radio value="navbar-gray-dark">
                      <div
                        className="bg-gray-dark elevation-2"
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

                    <Radio value="navbar-gray">
                      <div
                        className="bg-gray elevation-2"
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

                    <Radio value="navbar-light">
                      <div
                        className="bg-light elevation-2"
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

                    <Radio value="navbar-warning">
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

                    <Radio value="navbar-white">
                      <div
                        className="bg-white elevation-2"
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

                    <Radio value="navbar-orange">
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
                      onClick={handleUpdateNavVariant}
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
        {/* /.content */}
      </div>
    </>
  );
}

export default NavBarVariant;
