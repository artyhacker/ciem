import React, { FC, useState, useCallback } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider, message } from "antd";
import XLSX from "xlsx";
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { DataType, DEFAULT_DATA, ExcelDataType } from "../../../models/data";
import DataDictMap from "./DataDictMap";
import { RcFile } from "antd/es/upload/interface";
import { validateForm } from '../utils';

interface Props {
  onRegister: (data: DataType) => void;
}

const EXCEL_TYPE_LIST = ["xls", "xlsx", "csv"];
const fileNameStyle = {
  flex: 1,
  height: "2rem",
  lineHeight: "2rem",
  marginLeft: ".5rem",
  border: "1px dashed rgba(0,0,0,0.1)",
  overflow: "hidden",
  padding: "0 .5rem",
};

export type DataMapType = { [key: string]: { id: string; name: string } };

const DataForm: FC<Props> = ({ onRegister }) => {
  const [dataMap, setDataMap] = useState<DataMapType>({});
  const [item, setItem] = useState<DataType>(DEFAULT_DATA);

  const onSave = useCallback(() => {
    let postDataMap = Object.keys(dataMap).map((key) => ({
      dictId: key,
      ...dataMap[key],
    }));
    postDataMap = postDataMap.filter(pf => (!!pf.id || !!pf.name));
    const postData = {
      ...item,
      dataMap: postDataMap,
    };
    if (validateForm(postData)) {
      onRegister(postData);
    }
  }, [item, dataMap, onRegister]);

  const onReset = useCallback(() => {
    setItem(DEFAULT_DATA);
    setDataMap({});
  }, []);

  const beforeUpload = (file: RcFile) => {
    const index = file.name.lastIndexOf(".");
    const fileType = file.name.slice(index + 1);
    const fileName = file.name.slice(0, index);
    if (EXCEL_TYPE_LIST.includes(fileType)) {
      const fr = new FileReader();
      fr.readAsBinaryString(file);
      fr.onload = () => {
        const readResult = XLSX.read(fr.result, { type: "binary" });
        const xData = readResult.Sheets[readResult.SheetNames[0]];
        const data: ExcelDataType[] = XLSX.utils.sheet_to_json(xData);
        setItem((prev) => ({ ...prev, tableName: fileName, data }));
      };
      fr.onerror = () => {
        message.error("文件读取失败");
      };
      return false;
    } else {
      message.error("文件格式错误");
    }
    return false;
  };

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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Upload action="#" beforeUpload={beforeUpload} fileList={[]}>
              <Button type="primary">
                <UploadOutlined /> 上传Excel
              </Button>
            </Upload>
            <div style={fileNameStyle}>{item.tableName || "未上传文件"}</div>
          </div>
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
          <span style={{ height: '2rem', lineHeight: '2rem' }}>{`协议类型：${item.protocol || "HTTP"}；请求方式：${
            item.method || "POST"
          }`}</span>
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
