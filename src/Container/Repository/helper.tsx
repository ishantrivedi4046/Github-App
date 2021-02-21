import { Button } from "antd";
import React from "react";
import { Ri } from "../../Config/iconConfig";
import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";

export const RepoColumns = (handleDrawerOpen: any) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (item: any, record: any, index: number) => {
      return (
        <Link to="#" style={{ cursor: "default" }}>
          {record.id}
        </Link>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Created At (UTC)",
    dataIndex: "created_at",
    key: "created_at",
    render: (item: any, record: any, index: number) => {
      return <span>{new Date(record.created_at).toUTCString()}</span>;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (item: any, record: any, index: number) => {
      return (
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button onClick={() => handleDrawerOpen(record)}>
            <Icon component={Ri.RiEyeFill} style={{ color: "#E06501" }} />
          </Button>
          <Button style={{ marginLeft: "1rem" }}>
            <Icon component={Ri.RiDeleteBin4Fill} style={{ color: "red" }} />
          </Button>
        </div>
      );
    },
  },
];
