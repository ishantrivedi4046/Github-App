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
    <div className="custom-table">
      <div className="custom-table-title">
        <Typography.Title level={3} style={{ color: "#083263" }}>{`${capitalize(
          type
        )} Table`}</Typography.Title>
      </div>
      <Table
        className="custom-table-content"
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={
          dataSource.length > 10 ? { position: ["bottomRight"] } : false
        }
      />
    </div>
  );
};

export default CustomTableComponent;
