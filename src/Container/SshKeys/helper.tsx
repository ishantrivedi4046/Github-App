import { Button, Card, notification, Popconfirm, Tooltip } from "antd";
import { get, truncate } from "lodash";
import React from "react";
import Icon from "@ant-design/icons";
import { Ri, Ai } from "../../Config/iconConfig";
import copy from "copy-to-clipboard";

export const sshColumns = (handleKeyDelete: any) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (item: any, record: any, index: number) => {
        return <Button type="link">{get(record, ["title"], "")}</Button>;
      },
    },
    {
      title: "Public Key",
      dataIndex: "key",
      key: "key",
      render: (item: any, record: any, index: number) => {
        const key = get(record, ["key"], "");
        return (
          <Tooltip
            title={
              <Card
                bordered={false}
                extra={
                  <Button
                    onClick={() => {
                      copy(key);
                      notification.success({
                        message: `${get(record, ["title"], "")} Copied!`,
                        duration: 1,
                      });
                    }}
                    size="large"
                    shape="circle"
                    style={{
                      backgroundColor: "#f50",
                      color: "white",
                      border: "1px solid #FF5500",
                    }}
                  >
                    <Icon
                      component={Ai.AiFillCopy}
                      style={{ fontSize: "2rem" }}
                    />
                  </Button>
                }
                style={{
                  fontWeight: "normal",
                  fontSize: "1.5rem",
                  backgroundColor: "#722ED1",
                  color: "white",
                }}
              >{`${truncate(key, { length: 100 })}...`}</Card>
            }
            color={"purple"}
          >
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
