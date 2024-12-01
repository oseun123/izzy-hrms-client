import React, { useEffect, useState } from "react";
import { Radio, Space, Button } from "antd";
import styles from "../../../../../styles/layout/Layout.module.css";
import { FormOutlined } from "@ant-design/icons";
import { useAxiosPrivate } from "../../../../../../hooks";
import { useDispatch } from "react-redux";
import { AiOutlineSkin } from "react-icons/ai";
import $ from "jquery";
import { updateCurrentUserSettings } from "../../../../../../store/actions/userActions";
import { RadioChangeEvent } from "antd/lib/radio"; 
import { CurrentClient } from "../../../../../../@types/api.types";

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

const brand_dark_skins = [
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
  "navbar-fuchsia"
];

const brand_light_skins = [
  "navbar-light", 
  "navbar-warning", 
  "navbar-white", 
  "navbar-orange"
];

interface LightSideBarVariantProps {
    currentCleint: CurrentClient;
    setEnabled: (enabled: boolean) => void;
}

const LightSideBarVariant: React.FC<LightSideBarVariantProps> = ({ currentCleint, setEnabled }) => {
    const dispatch = useDispatch();
    const resquest = useAxiosPrivate();
    const init_settings = currentCleint?.settings;
    
    const [side_light_variant, setSideLightVariant] = useState<string>(
        JSON.parse(init_settings)[0]?.display?.sidebar_variant
    );
    const [spinner, setSpinner] = useState<boolean>(false);
    const [settings, setSettings] = useState<string>(init_settings);

    function onChangeSideBarlight(e: RadioChangeEvent) {
        const selected_color = e.target.value;
        const sidebar = $(".main-sidebar");
        const sidebar_all_skin = navbar_light_skins.concat(navbar_dark_skins);
        
        sidebar_all_skin.forEach((skin) => sidebar.removeClass(skin));
        sidebar.addClass(selected_color);

        // for brand logo
        const brand_header = $(".brand-link");
        const brand_all_colors = brand_dark_skins.concat(brand_light_skins);
        
        brand_all_colors.forEach((color) => brand_header.removeClass(color));
        brand_header.addClass("navbar-light");
        
        setSideLightVariant(selected_color);
    }

    useEffect(() => {
        if (settings) {
            const current_settings = [...JSON.parse(settings)];
            current_settings[0].display = {
                ...current_settings[0].display,
                sidebar_variant: side_light_variant,
                brand_variant: 'navbar-light',
            };
            setSettings(JSON.stringify(current_settings));
        }
    }, [side_light_variant, settings]);

    useEffect(() => {
        const current_settings = currentCleint?.settings;
        setSideLightVariant(
            JSON.parse(current_settings)[0]?.display?.sidebar_variant
        );
    }, [currentCleint]);

    function handleUpdateSettings(e: React.MouseEvent<HTMLElement>) {
        setSpinner(true);
        updateCurrentUserSettings(dispatch, resquest, { settings }).then((res) => {
            setSpinner(false);
            if (res.status === 'success') setEnabled(true);
        });
    }

    return (
        <>
            <div className="col-md-6">
                {/* Main content */}
                <section className="content col-md-12">
                    {/* Default box */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <span className="space__align">
                                    <AiOutlineSkin className="icon__color" /> Light Theme Variants
                                </span>
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-wrap mb-3">
                                <Radio.Group onChange={onChangeSideBarlight} value={side_light_variant}>
                                    <Space wrap>
                                        {navbar_light_skins.map((skin) => (
                                            <Radio key={skin} value={skin}>
                                                <div
                                                    className={`bg-${skin.split('-')[2]} elevation-2`}
                                                    style={{
                                                        width: 40,
                                                        height: 20,
                                                        borderRadius: '25px',
                                                        marginRight: '10px',
                                                        marginBottom: '-3px',
                                                        opacity: '0.8',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </div>
                            <div className="row mt-3">
                                <div className="form-group col-md-6 ">
                                    <Space>
                                        <Button type="primary" icon={<FormOutlined />} loading={spinner} onClick={handleUpdateSettings} className={styles.on_hover}>
                                            {" "} Update 
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        </div> {/* /.card-body */}
                    </div> {/* /.card */}
                </section>
            </div>
        </>
    );
};

export default LightSideBarVariant;