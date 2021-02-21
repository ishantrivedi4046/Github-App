import { Table, Typography } from "antd";
import { capitalize } from "lodash";
import React from "react";

interface CustomTableComponentProps {
  type: string;
  columns: any;
  dataSource: any;
  expandable?: any;
}

const CustomTableComponent: React.FC<CustomTableComponentProps> = ({
  type,
  columns,
  dataSource,
  expandable,
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
        expandable={expandable}
        pagination={
          dataSource.length > 10 ? { position: ["bottomRight"] } : false
        }
      />
    </div>
  );
};

export default CustomTableComponent;
