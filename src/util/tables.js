import { Space, Input, Button, Tag, Popconfirm } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LetteredAvatar from "react-lettered-avatar";
import { arrayWithColors } from "./helpers";

const desc_text = "Are you sure you want to perform this action?";

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
      render: (value, record) => {
        return (
          <Space>
            <LetteredAvatar
              name={`${value || ""}}`}
              size={22}
              backgroundColors={arrayWithColors}
            />
            {value}
          </Space>
        );
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
      render: (value, record) => {
        return (
          <Space>
            <LetteredAvatar
              name={`${value || ""}}`}
              size={22}
              backgroundColors={arrayWithColors}
            />
            {value}
          </Space>
        );
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
                description={desc_text}
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

const role_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_role,
  edit_role
) => {
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
            {edit_role ? (
              <Link to={`/preferences/edit-roles/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}
            {delete_role ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  description={desc_text}
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
            ) : null}
          </Space>
        );
      },
    },
  ];
};
const department_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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

      // render: (value, record) => {
      //   return { value };
      // },
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
      title: "HOD",
      key: "hod",
      dataIndex: "hod",
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
              placeholder="Filter Hod"
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
      render: (hod, record) => {
        return hod > 0 ? (
          <Space>
            <LetteredAvatar
              name={`${record?.headOfDepartment?.fullname || ""}}`}
              size={22}
              backgroundColors={arrayWithColors}
            />
            {record?.headOfDepartment?.fullname}
          </Space>
        ) : (
          "N/A"
        );
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
            {edit_dept ? (
              <Link to={`/preferences/edit-departments/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  description={desc_text}
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
            ) : null}
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
      render: (value, record) => {
        return (
          <Space>
            <LetteredAvatar
              name={`${value || ""}}`}
              size={22}
              backgroundColors={arrayWithColors}
            />
            {value}
          </Space>
        );
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

      render: (value, record) => {
        return (
          <Space>
            <LetteredAvatar
              name={`${value || ""}}`}
              size={22}
              backgroundColors={arrayWithColors}
            />
            {value}
          </Space>
        );
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

const company_details_columns = () => {
  return [
    {
      title: "Branch Name",
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
              placeholder="Filter name"
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
    },
  ];
};

const gender_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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
            <Link to={`/preferences/view-genders/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            {edit_dept ? (
              <Link to={`/preferences/edit-genders/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
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
            ) : null}
          </Space>
        );
      },
    },
  ];
};

const state_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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
            <Link to={`/preferences/view-states/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            {edit_dept ? (
              <Link to={`/preferences/edit-states/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  onConfirm={() => {
                    // console.log({ id });
                    confirmAction(id);
                  }}
                  okText="Yes"
                  cancelText="No"
                  description={desc_text}
                >
                  <Tag color="red">Delete</Tag>
                </Popconfirm>
              </Link>
            ) : null}
          </Space>
        );
      },
    },
  ];
};
const country_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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
            <Link to={`/preferences/view-countries/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            {edit_dept ? (
              <Link to={`/preferences/edit-countries/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  description={desc_text}
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
            ) : null}
          </Space>
        );
      },
    },
  ];
};

const company_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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
      title: "Total branches",
      key: "branches",
      dataIndex: "branches",
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
              placeholder="Filter total branches"
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
        return record.branches.length === parseInt(value);
      },
      render: (branches, record) => {
        return branches?.length;
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
            <Link to={`/preferences/view-companies/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            {edit_dept ? (
              <Link to={`/preferences/edit-companies/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  description="Are you sure you want to peform this action?"
                  onConfirm={() => {
                    // console.log({ id });
                    confirmAction(id);
                  }}
                  okText="Yes"
                  okType="defualt"
                  cancelText="No"
                >
                  <Tag color="red">Delete</Tag>
                </Popconfirm>
              </Link>
            ) : null}
          </Space>
        );
      },
    },
  ];
};
const branch_columns = (
  isTabletOrMobile,
  confirm_text,
  confirmAction,
  delete_perm,
  edit_dept
) => {
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
        return (
          <Space>
            {value}
            {record.headquarters ? <Tag color="green">headquarters</Tag> : null}
          </Space>
        );
      },
    },

    {
      title: "Company",
      dataIndex: "company",
      key: "company",
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
              placeholder="Filter Company"
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
        return record.company.name.toLowerCase().includes(value.toLowerCase());
      },

      render: (value, record) => {
        return record.company.name;
      },
    },

    {
      title: "Total managers",
      key: "managers",
      dataIndex: "managers",
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
              placeholder="Filter total managers"
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
        return record.managers.length === parseInt(value);
      },
      render: (managers, record) => {
        return managers?.length;
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
            <Link to={`/preferences/view-branches/${id}`}>
              <Tag color="geekblue">View</Tag>
            </Link>
            {edit_dept ? (
              <Link to={`/preferences/edit-branches/${id}`}>
                <Tag color="cyan">Edit</Tag>
              </Link>
            ) : null}

            {delete_perm ? (
              <Link to="#">
                <Popconfirm
                  placement="topRight"
                  title={confirm_text}
                  description={desc_text}
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
            ) : null}
          </Space>
        );
      },
    },
  ];
};

export {
  role_details_columns,
  role_columns,
  department_columns,
  department_details_columns,
  gender_columns,
  state_columns,
  country_columns,
  company_columns,
  company_details_columns,
  branch_columns,
};
