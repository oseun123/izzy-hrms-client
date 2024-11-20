import React from "react";
import { Link } from "react-router-dom";

import { Badge, Progress, Space, Table, Tag } from "antd";
import HumanResourceHero from "../HumanResourceHero";

import AminatedLayout from "../../../../../ui/AminatedLayout";
import Avatar from "react-avatar";

function ViewEmployee() {
  const columns = [
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return (
          <Space>
            <Avatar
              name={text}
              size={25}
              round={true}
              style={{ fontSize: "100px" }}
            />

            <Link>{text}</Link>
          </Space>
        );
      },
    },
    {
      title: "Department",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Designation",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Status",
      dataIndex: "age",
      key: "age",
      render: function (age, record) {
        return <Badge status="success" text="Active" />;
      },
    },
    {
      title: "Profile completeness",
      dataIndex: "address",
      key: "address",
      render: function () {
        return <Progress percent={30} />;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tag color="geekblue">Overview</Tag>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <HumanResourceHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>View Employee</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">Onboarding</li>
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
                    <h3 className="card-title">Employee list</h3>
                  </div>
                  <div className="card-body">
                    <Table
                      columns={columns}
                      dataSource={data}
                      expandable={{
                        expandedRowRender: (record) => (
                          <div
                            style={{
                              margin: 0,
                            }}
                            className="card w-75"
                          >
                            <table className="table ">
                              <thead>
                                <tr>
                                  <th scope="col">Profile</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Bio Data</td>
                                  <td>
                                    <span class="badge badge-danger p-1">
                                      Pending
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                      <Tag color="red">Notify</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Financial</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Medical </td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Education History</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Employement History</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Next Of Kin</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Document</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Dependants</td>
                                  <td>
                                    <span class="badge badge-success p-1">
                                      Completed
                                    </span>
                                  </td>
                                  <td>
                                    <Space>
                                      <Tag color="geekblue">View</Tag>
                                    </Space>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        ),
                      }}
                    />
                  </div>
                  {/* /.card-body */}
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

export default ViewEmployee;
