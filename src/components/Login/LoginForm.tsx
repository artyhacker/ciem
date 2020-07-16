import React, { FC } from "react";
import { Modal, Form, Input, Cascader, message } from "antd";
import { History } from 'history';
import { useForm } from "antd/es/form/Form";
import getAreaData from "../../utils/area";
import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { setToken } from "../../utils/tokenUtils";

interface Props {
  onClose: () => void;
  visible: boolean;
  history: History;
}

const FormItem = Form.Item;

const AREA_DATA = getAreaData();

const rules = {
  required: { required: true }
};

const LoginForm: FC<Props> = ({ visible, onClose, history }) => {
  const [form] = useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.password !== values.password1) {
          message.warn('两次输入的密码不一致，请重新输入');
          form.setFieldsValue({ password1: null });
          return;
        }
        let { areaData, ...data } = values;
        console.log(data);
        axiosInstance
          .post(api.user, data)
          .then(res => {
            if (isOk(res)) {
              setToken(res.data);
              onClose();
              message.success('注册成功，欢迎您！');
              history.push('/my-data');
            } else {
              message.error('注册失败');
              // TODO: 错误处理
            }
          })
          .catch(e => {
            console.log(e);
            message.error('注册失败');
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal
      visible={visible}
      title="注册新用户"
      onOk={onOk}
      onCancel={onClose}
      okText="注册并登录"
      afterClose={() => form.resetFields()}
      maskClosable={false}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 1 }}>
        <FormItem label="用户名" name="username" rules={[rules.required]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="机构名称" name="name" rules={[rules.required]}>
          <Input placeholder="请输入机构名称" />
        </FormItem>
        <FormItem label="所在地区" name="areaData" rules={[rules.required]}>
          <Cascader options={AREA_DATA} placeholder="请选择所在地区" onChange={(v, o) => {
            form.setFieldsValue({
              area: Number(v[2]),
              areaLabel: o?.map(om => om.label).join('/'),
            });
          }} />
        </FormItem>
        <FormItem label="密码" name="password" rules={[rules.required]}>
          <Input placeholder="请输入密码" />
        </FormItem>
        <FormItem label="确认密码" name="password1" rules={[rules.required]}>
          <Input placeholder="请再次输入密码" />
        </FormItem>
        <FormItem label="AREA" name="area" style={{ display: 'none' }}>
          <Input />
        </FormItem>
        <FormItem label="AREA_LABEL" name="areaLabel" style={{ display: 'none' }}>
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default LoginForm;
