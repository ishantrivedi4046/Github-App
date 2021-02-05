import { Popconfirm, Tooltip } from "antd";
import { get, truncate } from "lodash";
import React from "react";
import Icon from "@ant-design/icons";
import { Ri } from "../../Config/iconConfig";

export const sshColumns = (handleKeyDelete: any) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (item: any, record: any, index: number) => {
        return (
          <a href={get(record, ["url"], "")} target={"_blank"} rel="noreferrer">
            {get(record, ["title"], "")}
          </a>
        );
      },
    },
    {
      title: "Public Key",
      dataIndex: "key",
      key: "key",
      render: (item: any, record: any, index: number) => {
        const key = get(record, ["key"], "");
        return (
          <Tooltip title={key || "Nothing to show!"}>
            {truncate(key, { length: 10 })}
          </Tooltip>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (item: any, record: any, index: number) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return (
          <p>
            {new Date(get(record, ["created_at"], "")).toLocaleDateString(
              undefined,
              options
            )}
          </p>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (item: any, record: any, index: number) => {
        return (
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleKeyDelete(record?.id || "")}
            okText="Yes"
            cancelText="No"
          >
            <Icon
              component={Ri.RiDeleteBin3Fill}
              style={{ fontSize: "1.5rem", color: "red" }}
            />
          </Popconfirm>
        );
      },
    },
  ];
};
