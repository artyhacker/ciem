import React, { FC, useMemo } from "react";
import { Table, Button } from "antd";
import {
  EllipsisOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { MyDataType } from "../../../models/data";

interface Props {
  dataSource: MyDataType[];
  onDesc: (item: MyDataType) => void;
  onApply: (item: MyDataType) => void;
  spinning: boolean;
}

const DataApplicationTable: FC<Props> = ({ dataSource, onDesc, onApply, spinning }) => {
  const columns = useMemo(
    () => [
      { title: "数据名称", dataIndex: "name", width: "35%" },
      { title: "数据描述", dataIndex: "describe", width: "35%" },
      {
        title: "操作",
        dataIndex: "OPERATIONS",
        render: (t: any, r: MyDataType) => (
          <>
            <Button
              size="small"
              style={{ color: "#1890FF" }}
              title="详情"
              onClick={() => onDesc(r)}
            >
              详情 <EllipsisOutlined />
            </Button>
            <Button size="small" style={{ color: "#1890FF", margin: '0 .5rem' }} title="申请" onClick={() => onApply(r)}>
              申请 <FileDoneOutlined />
            </Button>
          </>
        ),
      },
    ],
    [onDesc, onApply]
  );

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
      size="small"
      loading={spinning}
    />
  );
};

export default DataApplicationTable;
