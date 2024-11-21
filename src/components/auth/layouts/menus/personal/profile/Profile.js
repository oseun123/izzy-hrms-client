import React from "react";
import { Link } from "react-router-dom";
import PersonalHero from "../PersonalHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { ImProfile } from "react-icons/im";
import { Tabs } from "antd";
import BioData from "./BioData";
import Financial from "./Financial";
import NextOfKin from "./NextOfKin";

function Profile() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Bio Data",
      children: <BioData />,
    },
    {
      key: "2",
      label: "Financial",
      children: <Financial />,
    },
    {
      key: "3",
      label: "Medical",
      children: "Content of Tab Medical",
    },
    {
      key: "4",
      label: "Education History",
      children: "Content of Tab Education History",
    },
    {
      key: "5",
      label: "Next Of Kin",
      children: <NextOfKin />,
    },
    {
      key: "6",
      label: "Document",
      children: "Content of Tab Document",
    },
    {
      key: "7",
      label: "Dependants",
      children: "Content of Tab Dependants",
    },
    {
      key: "8",
      label: "References",
      children: "Content of Tab References",
    },
    {
      key: "9",
      label: "Company properties",
      children: "Content of Tab Company properties",
    },
  ];
  return (
    <>
      <PersonalHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>My Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Personal</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content col-md-12">
          <div className="container-fluid">
            {/* Default box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="space__align">
                    {" "}
                    <ImProfile /> Personal Overview
                  </span>
                </h3>
                <div className="card-tools"></div>
              </div>
              <div className="card-body">
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  onChange={onChange}
                  className="mb-3"
                />
              </div>
              {/* /.card-body */}
            </div>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default Profile;
