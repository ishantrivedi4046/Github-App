import { Table, Typography } from "antd";
import { capitalize } from "lodash";
import React from "react";

interface CustomTableComponentProps {
  type: string;
  columns: any;
  dataSource: any;
}

const CustomTableComponent: React.FC<CustomTableComponentProps> = ({
  type,
  columns,
  dataSource,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "left", width: "100%" }}>
        <Typography.Title level={2}>{`User ${capitalize(
          type
        )}`}</Typography.Title>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        style={{ margin: "2rem" }}
      />
    </div>
  );
};

export default CustomTableComponent;
