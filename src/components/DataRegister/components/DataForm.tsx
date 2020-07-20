import React, { FC, useState, useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider, Select, Table } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import * as dictActions from "../../Dict/actions";
import { DictType } from "../../../models/dict";

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
              onBlur={(e) => {
                e.persist();
                setDataMap((prev) => ({
                  ...prev,
                  [r.id]: { name: value.name, id: e.target.value },
                }));
              }}
              style={{ width: '80%' }}
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

  return (
    <div className={styles.right}>
      <Row gutter={[32, 16]} style={{ paddingLeft: "1rem" }}>
        <Col span={8}>
          <Input placeholder="数据名称" />
        </Col>
        <Col span={8}>
          <Input placeholder="数据描述" />
        </Col>
        <Col span={8}>
          <Upload>
            <Button type="primary">
              <UploadOutlined /> 上传Excel
            </Button>
          </Upload>
        </Col>
        <Col span={8}>
          <Input placeholder="数据库表所在服务器IP" />
        </Col>
        <Col span={8}>
          <Input placeholder="端口" />
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
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default DataForm;
