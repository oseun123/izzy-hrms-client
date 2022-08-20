import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseRefreshTest } from "../../../../../store/actions/userHooksActions";
import { Space, Table, Tag } from "antd";

function PersonalDashboard() {
  const [enabled, setEnabled] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    refetch();
  }
  const { refetch } = UseRefreshTest(enabled, setEnabled);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <Link>{text}</Link>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";

            if (tag === "loser") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link>Invite {record.name}</Link>
          <Link>Delete</Link>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
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
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Personal Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">My Records</h3>
                </div>
                <div className="card-body">
                  <button onClick={handleClick}>click</button>
                  Start creating your amazing application!
                  <Table columns={columns} dataSource={data} />
                </div>
                {/* /.card-body */}
                <div className="card-footer">Footer</div>
                {/* /.card-footer*/}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </>
  );
}

export default PersonalDashboard;
