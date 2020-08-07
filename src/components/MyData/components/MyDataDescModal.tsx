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

  const dataSource = useMemo(() => (item && item.dataMap ? item.dataMap : []), [item]);

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={null}
      title="数据详情"
      width={600}
    >
      <Form wrapperCol={{ span: 14 }} labelCol={{ span: 8 }}>
        <Row>
          <Col span={12}>
            <Form.Item label="服务器IP">
              <Input value={getValue("ip")} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="服务器端口">
              <Input value={getValue("port")} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="协议类型">
              <Input value={getValue("protocol")} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="请求方式">
              <Input value={getValue("method")} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          size="small"
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Form>
    </Modal>
  );
};

export default MyDataDescModal;
