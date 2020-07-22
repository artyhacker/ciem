import React, { FC } from "react";
import { Table, Button } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MyDataType } from "../../../models/data";

interface Props {
  dataSource: MyDataType[];
}

const columns = [
  { title: "数据名称", dataIndex: "name", width: "25%" },
  { title: "数据描述", dataIndex: "describe", width: "25%" },
  // TODO: 调试完毕删除
  { title: "类型(待隐藏)", dataIndex: "type", width: "25%" },
  {
    title: "操作",
    dataIndex: "OPERATIONS",
    render: () => (
      <>
        <Button size="small" style={{ color: "#1890FF" }} title="详情">
          详情 <EllipsisOutlined />
        </Button>
        <Button
          size="small"
          style={{ color: "#1890FF", margin: "0 .5rem" }}
          title="编辑"
        >
          编辑 <EditOutlined />
        </Button>
        <Button size="small" style={{ color: "#1890FF" }} title="删除">
          删除 <DeleteOutlined />
        </Button>
      </>
    ),
  },
];

const MyDataTable: FC<Props> = ({ dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
      size="small"
    />
  );
};

export default MyDataTable;
