import { Space, Input, Button, Tag, Popconfirm } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const role_details_columns = (confirm_text, removeUser) => {
  return [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter First name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.first_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Last Name",
      key: "last_name",
      dataIndex: "last_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter Last name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.last_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter email"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => {
        const { id } = record;
        return (
          <Space>
            <Link>
              <Popconfirm
                placement="topRight"
                title={confirm_text}
                onConfirm={() => {
                  removeUser(id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tag color="red">Remove</Tag>
              </Popconfirm>
            </Link>
          </Space>
        );
      },
    },
  ];
};

const role_columns = (isTabletOrMobile, confirm_text, confirmAction) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter Name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },

      render: (text, record) => {
        return (
          <Space>
            {text}
            {record.default ? <Tag color="green">default</Tag> : null}
          </Space>
        );
      },
    },

    {
      title: "Total users",
      key: "users",
      dataIndex: "users",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter total users"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.users.length === parseInt(value);
      },
      render: (users, record) => {
        return users?.length;
      },
    },

    {
      title: "Total permissions",
      dataIndex: "permissions",
      key: "permissions",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter total permissions"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.permissions.length === parseInt(value);
      },
      render: (permissions, record) => {
        return permissions?.length;
      },
    },

    {
      title: "Action",
      key: "action",
      width: isTabletOrMobile ? 100 : 200,
      fixed: "right",
      render: (_, record) => {
        const { id } = record;
        return (
          <Space wrap={isTabletOrMobile}>
            <Link to={`/preferences/view-roles/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            <Link to={`/preferences/edit-roles/${id}`}>
              <Tag color="cyan">Edit</Tag>
            </Link>
            <Link>
              <Popconfirm
                placement="topRight"
                title={confirm_text}
                onConfirm={() => {
                  // console.log({ id });
                  confirmAction(id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tag color="red">Delete</Tag>
              </Popconfirm>
            </Link>
          </Space>
        );
      },
    },
  ];
};
const department_columns = (isTabletOrMobile, confirm_text, confirmAction) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter Name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },

      render: (value, record) => {
        return value;
      },
    },

    {
      title: "Total users",
      key: "users",
      dataIndex: "users",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter total users"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.users.length === parseInt(value);
      },
      render: (users, record) => {
        return users?.length;
      },
    },

    {
      title: "Action",
      key: "action",
      width: isTabletOrMobile ? 100 : 200,
      fixed: "right",
      render: (_, record) => {
        const { id } = record;
        return (
          <Space wrap={isTabletOrMobile}>
            <Link to={`/preferences/view-departments/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            <Link to={`/preferences/edit-departments/${id}`}>
              <Tag color="cyan">Edit</Tag>
            </Link>
            <Link>
              <Popconfirm
                placement="topRight"
                title={confirm_text}
                onConfirm={() => {
                  // console.log({ id });
                  confirmAction(id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tag color="red">Delete</Tag>
              </Popconfirm>
            </Link>
          </Space>
        );
      },
    },
  ];
};

const department_details_columns = () => {
  return [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter First name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.first_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Last Name",
      key: "last_name",
      dataIndex: "last_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter Last name"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.last_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Filter email"
              value={selectedKeys[0]}
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            ></Input>
            <Space className="my-1">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                }}
                icon={<RedoOutlined />}
              >
                Reset
              </Button>
            </Space>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
};

export {
  role_details_columns,
  role_columns,
  department_columns,
  department_details_columns,
};
