import React, { FC } from "react";
import { Table } from "antd";
import { DictColumns } from "../../models/dict";

interface Props {
  isLoading: boolean;
}

const DictTable: FC<Props> = ({ isLoading }) => {
  return (
    <Table
      rowKey="id"
      columns={DictColumns}
      dataSource={[]}
      bordered
      pagination={false}
      loading={isLoading}
    />
  );
};

export default DictTable;
