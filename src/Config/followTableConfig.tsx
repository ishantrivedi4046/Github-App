import { Button, Typography } from "antd";
import React from "react";
import { PROFILE_CHART_COLOR } from "../Container/Profile/helper";

export const getFollowColumns = (func: any) => {
  return [
    {
      title: "AVATAR",
      dataIndex: "avatar_url",
      key: "avatar_url",
      width: "10%",
      render: (text: any, record: any, index: number) => (
        <img
          src={record.avatar_url}
          alt="No Avatar"
          style={{
            borderRadius: "100%",
            backgroundSize: "contain",
            width: "6rem",
            height: "6rem",
          }}
        />
      ),
    },
    {
      title: "GITHUB USERNAME",
      dataIndex: "username",
      key: "username",
      render: (text: any, record: any, index: number) => (
        <Typography.Text
          style={{ color: `${PROFILE_CHART_COLOR}`, fontSize: "medium" }}
        >
          {record.username}
        </Typography.Text>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any, index: number) => (
        <Button danger type="link" onClick={() => func(record)}>
          View Profile
        </Button>
      ),
    },
  ];
};
