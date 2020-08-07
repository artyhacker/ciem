import React, { FC, useCallback, useMemo } from "react";
import { DataType } from "../../../models/data";
import { Modal, Row, Col, Form, Input, Table } from "antd";

interface Props {
  visible: boolean;
  item: DataType | undefined;
  onClose: () => void;
}

const columns = [
  { title: "CIEM数据元字典标识符", dataIndex: "dictId" },
  { title: "CIEM数据元字典中文名称", dataIndex: "dictName" },
];

const MyDataDescModal: FC<Props> = ({ visible, item, onClose }) => {
  const getValue = useCallback(
    (field: keyof DataType) => {
      if (!item || !item[field]) {
        return undefined;
      }
      return item[field] as string;
    },
    [item]
  );

  const dataSource = useMemo(() => (item && item.dataMap ? item.dataMap : []), [
    item,
  ]);

  const getFieldItem = (label: string, value: any) => (
    <span>{`${label}：${value}`}</span>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={null}
      title="数据详情"
      width={600}
    >
      <Row gutter={[16, 16]} style={{ padding: "0 1rem" }}>
        <Col span={24}>{getFieldItem("数据提供方", getValue("uploader"))}</Col>
        <Col span={12}>{getFieldItem("服务器IP", getValue("ip"))}</Col>
        <Col span={12}>{getFieldItem("服务器端口", getValue("port"))}</Col>
        <Col span={12}>{getFieldItem("协议类型", getValue("protocol"))}</Col>
        <Col span={12}>{getFieldItem("请求方式", getValue("method"))}</Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
        scroll={{ y: 400 }}
      />
    </Modal>
  );
};

export default MyDataDescModal;
