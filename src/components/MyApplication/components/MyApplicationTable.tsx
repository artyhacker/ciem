import React, { FC, useMemo } from "react";
import { Table, Button } from "antd";
import {
  EllipsisOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { MyApplicationType } from "../../../models/dataApplication";

interface Props {
  dataSource: MyApplicationType[];
  onDesc: (item: MyApplicationType) => void;
  onApply: (item: MyApplicationType) => void;
  spinning: boolean;
}

const MyApplicationTable: FC<Props> = ({ dataSource, onDesc, onApply, spinning }) => {
  const columns = useMemo(
    () => [
      { title: "申请名称", dataIndex: "name", width: "16%" },
      { title: "申请描述", dataIndex: "describe", width: "16%" },
      { title: "申请方", dataIndex: "applicant", width: "12%" },
      { title: "数据名称", dataIndex: "dataName", width: "16%" },
      { title: "数据描述", dataIndex: "dataDescribe", width: "16%" },
      {
        title: "操作",
        dataIndex: "OPERATIONS",
        render: (t: any, r: MyApplicationType) => (
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

export default MyApplicationTable;
