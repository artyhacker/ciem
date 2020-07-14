import React, { FC } from 'react';
import { Table } from 'antd';

const COLUMNS = [
  {
    dataIndex: 'id',
    title: 'CIEM数据元字典标识符',
  },
  {
    dataIndex: 'name',
    title: 'CIEM数据元字典中文名称',
  }
]

const DictTable: FC = () => {
  return (
    <Table rowKey="id" columns={COLUMNS} dataSource={[]} bordered />
  );
};

export default DictTable;
