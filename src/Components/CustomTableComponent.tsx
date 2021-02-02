import { Button, Table, Typography } from "antd";
import { capitalize } from "lodash";
import React from "react";

interface CustomTableComponentProps {
  type: string;
  columns: any;
  dataSource: any;
  handleRefresh: () => void;
  disable: boolean;
}

const CustomTableComponent: React.FC<CustomTableComponentProps> = ({
  type,
  columns,
  dataSource,
  disable,
  handleRefresh,
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
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title title={`User ${capitalize(type)}`}></Typography.Title>
        <Button type="primary" onClick={handleRefresh} disabled={disable}>
          Refresh
        </Button>
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
