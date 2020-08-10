import React, { FC, useMemo } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MyDataType } from "../../../models/data";
import history from "../../../utils/history";
import PROJECT_TYPE from "../../../configs/projectType";

interface Props {
  dataSource: MyDataType[];
  onDesc: (item: MyDataType) => void;
  onDel: (item: MyDataType) => void;
  getOriginData: (item: MyDataType) => void;
  spinning: boolean;
}

// @ts-ignore
const IS_UPLOADER = PROJECT_TYPE === 'uploader';

const MyDataTable: FC<Props> = ({
  dataSource,
  onDesc,
  onDel,
  spinning,
  getOriginData,
}) => {
  const columns = useMemo(
    () =>
    IS_UPLOADER
        ? [
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
                    onClick={() => getOriginData(r)}
                  >
                    详情 <EllipsisOutlined />
                  </Button>
                </>
              ),
            },
          ]
        : [
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
                  <Button
                    size="small"
                    style={{ color: r.isEdit ? "#1890FF" : "rgba(0,0,0,0.3)", margin: "0 .5rem" }}
                    title={r.isEdit ? '编辑' : '该条数据存在未审批的申请，暂时不可更改'}
                    onClick={() => {
                      history.push(`/register?id=${r.id}`);
                    }}
                    disabled={!r.isEdit}
                  >
                    编辑 <EditOutlined />
                  </Button>
                  <Popconfirm title="确认删除？" onConfirm={() => onDel(r)}>
                    <Button
                      size="small"
                      style={{ color: "#1890FF" }}
                      title="删除"
                    >
                      删除 <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </>
              ),
            },
          ],
    [onDesc, onDel, getOriginData]
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

export default MyDataTable;
