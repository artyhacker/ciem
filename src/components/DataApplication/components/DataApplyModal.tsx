import React, { FC, useMemo, useState, useEffect } from "react";
import { DataType } from "../../../models/data";
import { Modal, Row, Col, Form, Input, Table, Checkbox, Radio } from "antd";
import { DataMapType } from '../../../models/data';
import { useForm } from "antd/es/form/Form";
import getUserInfo from "../../../utils/getUserInfo";
import { DataApplicationType } from "../../../models/dataApplication";

interface Props {
  visible: boolean;
  item: DataType | undefined;
  onClose: () => void;
  onSave: (item: DataApplicationType) => void;
}

type KeyMap = { [key: string]: boolean };

const DataApplyModal: FC<Props> = ({ visible, item, onClose, onSave }) => {
  const [form] = useForm();

  const [reqMap, setReqMap] = useState<KeyMap>({});
  const [resMap, setResMap] = useState<KeyMap>({});

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ apiType: 'JSON' });
    }
  }, [form, visible]);

  const columns = [
    { title: "CIEM数据元字典标识符", dataIndex: "id", width: '40%' },
    { title: "CIEM数据元字典中文名称", dataIndex: "name", width: '40%' },
    {
      title: '请求包',
      dataIndex: 'requestFields',
      width: '10%',
      render: (v: string, r: DataMapType) => <Checkbox checked={reqMap[r.id]} onChange={e => setReqMap(prev => ({ ...prev, [r.id]: e.target.checked }))} />,
    },
    {
      title: '返回包',
      dataIndex: 'responseFields',
      render: (v: string, r: DataMapType) => <Checkbox checked={resMap[r.id]} onChange={e => setResMap(prev => ({ ...prev, [r.id]: e.target.checked }))} />,
    },
  ];

  const dataSource = useMemo(() => (item && item.dataMap ? item.dataMap : []), [item]);

  const onOk = () => {
    form.validateFields()
      .then((values) => {
        const requestFields = Object.keys(reqMap);
        const responseFields = Object.keys(resMap);
        const applicant = getUserInfo().name as string; 
        const resData = { ...values, requestFields, responseFields, status: 0, applicant, dataId: item?.id || '' };
        onSave(resData as DataApplicationType);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onCancel = () => {
    onClose();
  };

  const resetForm = () => form.resetFields();

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      afterClose={resetForm}
      onOk={onOk}
      maskClosable={false}
      title="数据申请"
      width={800}
    >
      <Form form={form} wrapperCol={{ span: 14 }} labelCol={{ span: 8 }}>
        <Row>
          <Col span={12}>
            <Form.Item label="申请名称" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="申请描述" name="describe">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="申请服务器IP" name="ip">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="申请服务器端口" name="port">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="接口形式" wrapperCol={{ span: 18 }} labelCol={{ span: 4 }} name="apiType">
              <Radio.Group disabled>
                <Radio value="JSON">JSON</Radio>
                <Radio value="XML">XML</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
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
      </Form>
    </Modal>
  );
};

export default DataApplyModal;
