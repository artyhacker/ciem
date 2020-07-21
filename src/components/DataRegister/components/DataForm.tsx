import React, { FC, useState, useCallback } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider } from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { DataType, DEFAULT_DATA } from "../../../models/data";
import DataDictMap from "./DataDictMap";

export type DataMapType = { [key: string]: { id?: string; name?: string } };

const DataForm: FC = () => {
  const [dataMap, setDataMap] = useState<DataMapType>({});
  const [item, setItem] = useState<DataType>(DEFAULT_DATA);

  const onSave = useCallback(() => {
    console.log(item);
    console.log(dataMap);
  }, [item, dataMap]);

  const onReset = useCallback(() => {
    setItem(DEFAULT_DATA);
    setDataMap({});
  }, []);

  return (
    <div className={styles.right}>
      <Row gutter={[32, 16]} style={{ paddingLeft: "1rem" }}>
        <Col span={8}>
          <Input
            placeholder="数据名称"
            value={item.name}
            onChange={(e) => {
              e.persist();
              setItem((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="数据描述"
            value={item.describe}
            onChange={(e) => {
              e.persist();
              setItem((prev) => ({ ...prev, describe: e.target.value }));
            }}
          />
        </Col>
        <Col span={8}>
          <Upload>
            <Button type="primary">
              <UploadOutlined /> 上传Excel
            </Button>
          </Upload>
        </Col>
        <Col span={8}>
          <Input
            placeholder="数据库表所在服务器IP"
            value={item.ip}
            onChange={(e) => {
              e.persist();
              setItem((prev) => ({ ...prev, ip: e.target.value }));
            }}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="端口"
            value={item.port}
            onChange={(e) => {
              e.persist();
              setItem((prev) => ({ ...prev, port: e.target.value }));
            }}
          />
        </Col>
        <Col span={8}>
          <span>协议类型：HTTP；请求方式：POST</span>
        </Col>
      </Row>
      <Divider />
      <DataDictMap dataMap={dataMap} setDataMap={setDataMap} />
      <Divider />
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          style={{ marginRight: "1rem" }}
          onClick={onSave}
          title="确认注册"
        >
          <SaveOutlined /> 确认
        </Button>
        <Button onClick={onReset} title="重置填写内容">
          <ReloadOutlined />
          重置
        </Button>
      </div>
    </div>
  );
};

export default DataForm;
