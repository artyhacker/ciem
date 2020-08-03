import React, { FC, useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider, message, Spin } from "antd";
import XLSX from "xlsx";
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { DataType, DEFAULT_DATA, ExcelDataType } from "../../../models/data";
import DataDictMap from "./DataDictMap";
import { RcFile } from "antd/es/upload/interface";
import { validateForm, fetchDataItem } from "../utils";
import { CallbackType } from "../../../models/global";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";

interface Props extends RouteComponentProps {
  onRegister: (data: DataType, cb: CallbackType, isEdit: boolean, errCb: () => void) => void;
  setType: (type: string) => void;
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

const getId = (location: Location): string => location.search.slice(4);
const getDataMap = (
  sourceData: { id: string; name: string; dictId: string, dictName: string }[]
): DataMapType => {
  const result: DataMapType = {};
  sourceData.forEach((s) => {
    result[s.dictId] = s;
  });
  return result;
};

export type DataMapType = { [key: string]: { id: string; name: string, dictId: string, dictName: string } };

const DataForm: FC<Props> = ({ onRegister, location, setType }) => {
  const [dataMap, setDataMap] = useState<DataMapType>({});
  const [item, setItem] = useState<DataType>(DEFAULT_DATA);
  const [isEdit, setIsEdit] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register" && location.search) {
      const id = getId(location);
      setSpinning(true);
      fetchDataItem(id, (data) => {
        setItem(data);
        setIsEdit(true);
        setDataMap(getDataMap(data.dataMap));
        setType(data.type);
        setSpinning(false);
      });
    }
  }, [location, setType]);

  const onReset = useCallback(() => {
    setItem(DEFAULT_DATA);
    setDataMap({});
  }, []);

  const onSave = useCallback(() => {
    let postDataMap = Object.keys(dataMap).map((key) => (dataMap[key]));
    postDataMap = postDataMap.filter((pf) => !!pf.id || !!pf.name);
    const postData = {
      ...item,
      dataMap: postDataMap,
    };
    if (validateForm(postData, isEdit)) {
      setSpinning(true);
      onRegister(postData, () => {
        onReset();
        message.success(isEdit ? "编辑成功" : "注册成功");
        setSpinning(false);
      }, isEdit, () => setSpinning(false));
    }
  }, [item, dataMap, onRegister, onReset, isEdit]);

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
      <Spin spinning={spinning}>
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
                <Button type="primary" disabled={isEdit}>
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
            <span style={{ height: "2rem", lineHeight: "2rem" }}>{`协议类型：${
              item.protocol || "HTTP"
            }；请求方式：${item.method || "POST"}`}</span>
          </Col>
        </Row>
      </Spin>
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

export default withRouter(DataForm);
