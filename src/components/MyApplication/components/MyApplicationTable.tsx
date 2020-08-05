import React, { FC, useMemo } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  EllipsisOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  MyApplicationType,
  ApplicationStatusType,
} from "../../../models/dataApplication";

interface Props {
  status: ApplicationStatusType;
  dataSource: MyApplicationType[];
  onDesc: (item: MyApplicationType) => void;
  onEdit: (item: MyApplicationType) => void;
  onDel: (item: MyApplicationType) => void;
  onDownload: (item: MyApplicationType) => void;
  spinning: boolean;
}

const MyApplicationTable: FC<Props> = ({
  dataSource,
  onDesc,
  onDownload,
  spinning,
  status,
  onEdit,
  onDel,
}) => {
  const columns0 = useMemo(
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
            <Button
              size="small"
              style={{ color: "#1890FF", margin: "0 .5rem" }}
              title="编辑"
              onClick={() => onEdit(r)}
            >
              编辑 <EditOutlined />
            </Button>
            <Popconfirm title="确认删除?" onConfirm={() => onDel(r)}>
              <Button size="small" style={{ color: "#1890FF" }} title="删除">
                删除 <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [onDesc, onEdit, onDel]
  );

  const columnsReject = useMemo(
    () => [
      { title: "申请名称", dataIndex: "name", width: "15%" },
      { title: "申请描述", dataIndex: "describe", width: "15%" },
      { title: "申请方", dataIndex: "applicant", width: "12%" },
      { title: "数据名称", dataIndex: "dataName", width: "15%" },
      { title: "数据描述", dataIndex: "dataDescribe", width: "15%" },
      { title: "驳回原因", dataIndex: "rejectText", width: "15%" },
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
          </>
        ),
      },
    ],
    [onDesc]
  );

  const columnsApprove = useMemo(
    () => [
      { title: "申请名称", dataIndex: "name", width: "18%" },
      { title: "申请描述", dataIndex: "describe", width: "18%" },
      { title: "申请方", dataIndex: "applicant", width: "12%" },
      { title: "数据名称", dataIndex: "dataName", width: "18%" },
      { title: "数据描述", dataIndex: "dataDescribe", width: "18%" },
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
            <Button
              size="small"
              style={{ color: "#1890FF", marginLeft: ".5rem" }}
              title="下载"
              onClick={() => onDownload(r)}
            >
              下载 <DownloadOutlined />
            </Button>
          </>
        ),
      },
    ],
    [onDesc, onDownload]
  );

  const columns = useMemo(
    () =>
      status === 0 ? columns0 : status === -1 ? columnsReject : columnsApprove,
    [columns0, columnsApprove, columnsReject, status]
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
