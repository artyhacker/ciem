import React, { FC } from "react";
import { Table } from "antd";
import { DictColumns, DictType } from "../../models/dict";

interface Props {
  isLoading: boolean;
  data: DictType[];
}

const DictTable: FC<Props> = ({ isLoading, data }) => {
  return (
    <Table
      rowKey="id"
      columns={DictColumns}
      dataSource={data}
      bordered
      pagination={false}
      loading={isLoading}
      size="small"
    />
  );
};

export default DictTable;
