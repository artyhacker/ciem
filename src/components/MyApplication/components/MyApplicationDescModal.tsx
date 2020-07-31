import React, { FC, useCallback, useMemo } from "react";
import { Modal, Row, Col, Table, Checkbox } from "antd";
import { DataMapType, DataType } from "../../../models/data";
import { MyApplicationDescType } from "../../../models/dataApplication";

interface Props {
  visible: boolean;
  item?: MyApplicationDescType;
  onClose: () => void;
}

type KeyMap = { [key: string]: boolean };

interface TableDataType extends DataMapType {
  isReq?: boolean;
  isRes?: boolean;
}

const MyApplicationDescModal: FC<Props> = ({ visible, item, onClose }) => {
  const columns = [
    { title: "CIEM数据元字典标识符", dataIndex: "dictId", width: "40%" },
    { title: "CIEM数据元字典中文名称", dataIndex: "dictName", width: "40%" },
    {
      title: "请求包",
      dataIndex: "requestFields",
      width: "10%",
      render: (v: string, r: TableDataType) => <Checkbox checked={!!r.isReq} />,
    },
    {
      title: "返回包",
      dataIndex: "responseFields",
      render: (v: string, r: TableDataType) => <Checkbox checked={!!r.isRes} />,
    },
  ];

  const dataSource: TableDataType[] = useMemo(() => {
    const result: TableDataType[] = [];
    if (item && item.requestFields) {
      result.push(...item.requestFields.map((rm) => ({ ...rm, isReq: true })));
    }
    if (item && item.responseFields) {
      item.responseFields.forEach((rf) => {
        const index = result.findIndex((rff) => rff.id === rf.id);
        if (index > -1) {
          result[index].isRes = true;
        } else {
          result.push({ ...rf, isRes: true });
        }
      });
    }
    return result;
  }, [item]);

  const getValue = useCallback(
    (key: keyof MyApplicationDescType, dataKey?: keyof DataType) => {
      if (!!item && item[key]) {
        if (key === "data" && dataKey) {
          return item[key][dataKey] || "";
        } else if (key !== "data") {
          return item[key] || "";
        }
      }
      return "";
    },
    [item]
  );

  const onCancel = () => {
    onClose();
  };

  const getFieldItem = (label: string, value: any) => (
    <span>{`${label}：${value}`}</span>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
      title="数据申请详情"
      width={800}
    >
      <Row gutter={[16, 16]} style={{ padding: '0 1rem' }}>
        <Col span={12}>{getFieldItem("申请名称", getValue("name"))}</Col>
        <Col span={12}>{getFieldItem("申请描述", getValue("describe"))}</Col>
        <Col span={12}>{getFieldItem("申请方", getValue("applicant"))}</Col>
        <Col span={12}>
          {getFieldItem("提供方", getValue("data", "uploader"))}
        </Col>
        <Col span={12}>{getFieldItem("申请服务器IP", getValue("ip"))}</Col>
        <Col span={12}>{getFieldItem("申请服务器端口", getValue("port"))}</Col>
        <Col span={12}>{getFieldItem("协议类型", "HTTP")}</Col>
        <Col span={12}>{getFieldItem("请求方式", "POST")}</Col>
        <Col span={12}>{getFieldItem("接口形式", getValue("apiType"))}</Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
        scroll={{ y: 300 }}
        bordered
      />
    </Modal>
  );
};

export default MyApplicationDescModal;
