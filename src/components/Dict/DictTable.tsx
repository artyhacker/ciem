import React, { FC } from "react";
import { Table } from "antd";
import { DictColumns } from "../../models/dict";

const DictTable: FC = () => {
  return (
    <Table
      rowKey="id"
      columns={DictColumns}
      dataSource={[]}
      bordered
      pagination={false}
    />
  );
};

export default DictTable;
