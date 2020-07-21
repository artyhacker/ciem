import React, { FC, useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider, Select, Table } from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import * as dictActions from "../../Dict/actions";
import { DictType } from "../../../models/dict";
import { DataType, DEFAULT_DATA } from "../../../models/data";

type DataMapType = { [key: string]: { id?: string; name?: string } };
const getDataMapValue = (
  dataMap: DataMapType,
  id: string
): { id?: string; name?: string } => {
  if (!dataMap[id]) {
    return {};
  }
  return dataMap[id];
};

const DataForm: FC = () => {
  const [dictFilter, setDictFilter] = useState<string>();
  const [dictFilterType, setDictFilterType] = useState<"name" | "id">("name");
  const [dictList, setDictList] = useState<DictType[]>([]);

  const [dataMap, setDataMap] = useState<DataMapType>({});
  const [item, setItem] = useState<DataType>(DEFAULT_DATA);

  useEffect(() => {
    dictActions.fetchList(setDictList);
  }, []);

  const COLOMNS = useMemo(
    () => [
      {
        dataIndex: "id",
        title: "CIEM数据元字典标识符",
        width: "25%",
      },
      {
        dataIndex: "name",
        title: "CIEM数据元字典中文名称",
        width: "25%",
      },
      {
        dataIndex: "dataId",
        title: "源数据数据项标识符",
        render: (v: string, r: DictType) => {
          const value = getDataMapValue(dataMap, r.id);
          return (
            <Input
              size="small"
              value={value.id}
              onBlur={(e) => {
                e.persist();
                setDataMap((prev) => ({
                  ...prev,
                  [r.id]: { name: value.name, id: e.target.value },
                }));
              }}
              style={{ width: "80%" }}
            />
          );
        },
        width: "25%",
      },
      {
        dataIndex: "dataName",
        title: "源数据数据项中文名称",
        render: (v: string, r: DictType) => {
          const value = getDataMapValue(dataMap, r.id);
          return (
            <Input
              size="small"
              value={value.name}
              onBlur={(e) => {
                e.persist();
                setDataMap((prev) => ({
                  ...prev,
                  [r.id]: { id: value.id, name: e.target.value },
                }));
              }}
            />
          );
        },
        width: "20%",
      },
    ],
    [dataMap]
  );

  const selectBefore = useMemo(
    () => (
      <Select value={dictFilterType} onChange={(v) => setDictFilterType(v)}>
        <Select.Option value="name">按中文名检索</Select.Option>
        <Select.Option value="id">按标识符检索</Select.Option>
      </Select>
    ),
    [dictFilterType]
  );

  const showDictList = useMemo(
    () =>
      dictFilter
        ? dictList.filter((d) => d[dictFilterType].indexOf(dictFilter) > -1)
        : dictList,
    [dictFilter, dictFilterType, dictList]
  );

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
      <Row>
        <Col span={8} style={{ paddingLeft: "1rem" }}>
          <Input
            addonBefore={selectBefore}
            placeholder="检索数据元字典"
            allowClear
            value={dictFilter}
            onChange={(e) => setDictFilter(e.target.value)}
          />
        </Col>
      </Row>
      <div
        style={{
          flex: 1,
          width: "100%",
          overflow: "auto",
          padding: "0 1rem",
          marginTop: "1rem",
        }}
      >
        <Table
          rowKey="id"
          columns={COLOMNS}
          dataSource={showDictList}
          size="small"
          bordered
        />
      </div>
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
