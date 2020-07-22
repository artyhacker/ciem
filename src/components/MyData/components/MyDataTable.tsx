import React, { FC, useMemo } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MyDataType } from "../../../models/data";

interface Props {
  dataSource: MyDataType[];
  onDesc: (item: MyDataType) => void;
}

const MyDataTable: FC<Props> = ({ dataSource, onDesc }) => {
  const columns = useMemo(() => ([
    { title: "数据名称", dataIndex: "name", width: "35%" },
    { title: "数据描述", dataIndex: "describe", width: "35%" },
    {
      title: "操作",
      dataIndex: "OPERATIONS",
      render: (t: any, r: MyDataType) => (
        <>
          <Button size="small" style={{ color: "#1890FF" }} title="详情" onClick={() => onDesc(r)}>
            详情 <EllipsisOutlined />
          </Button>
          <Button
            size="small"
            style={{ color: "#1890FF", margin: "0 .5rem" }}
            title="编辑"
          >
            编辑 <EditOutlined />
          </Button>
          <Popconfirm title="确认删除？">
            <Button size="small" style={{ color: "#1890FF" }} title="删除">
              删除 <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]), [onDesc]);

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
