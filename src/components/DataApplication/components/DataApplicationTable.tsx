import React, { FC, useMemo, useState, useEffect } from "react";
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
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setCurrent(1);
  }, [dataSource]);

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
      pagination={{
        current,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        size: 'small',
        total: dataSource.length,
        onChange: page => setCurrent(page),
        defaultPageSize: 20,
      }}
      size="small"
      loading={spinning}
    />
  );
};

export default DataApplicationTable;
