import React, { FC, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Row, Col, Input, Upload, Button, Divider, Select, Table } from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import * as dictActions from "../../Dict/actions";
import { DictType } from "../../../models/dict";

type DataMapType = {
  [key: string]: { id?: string; name?: string };
};

const DataForm: FC = () => {
  const [sType, setSType] = useState("S_NAME");
  const [dictList, setDictList] = useState<DictType[]>([]);
  const [dataMap, setDataMap] = useState<DataMapType>({});

  useEffect(() => {
    dictActions.fetchList(setDictList);
  }, []);

  const getDataMapValue = (r: DictType, k: "id" | "name"): string | undefined =>
    dataMap[r.id] ? dataMap[r.id][k] : undefined;

  const setDataMapValue = (r: DictType, k: "id" | "name", v: string) => {
    setDataMap((prev) => ({
      ...prev,
      [r.id]: prev[r.id] ? { ...prev[r.id], [k]: v } : { [k]: v },
    }));
  };
    
  const COLOMNS = [
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
      render: (v: string, r: DictType) => (
        <Input size="small" value={getDataMapValue(r, "id")} onChange={e => setDataMapValue(r, 'id', e.target.value)} />
      ),
      width: "25%",
    },
    {
      dataIndex: "dataName",
      title: "源数据数据项中文名称",
      render: (v: string, r: DictType) => (
        <Input size="small" value={getDataMapValue(r, "name")} onChange={e => setDataMapValue(r, 'name', e.target.value)} />
      ),
      width: "25%",
    },
  ];

  const selectBefore = (
    <Select value={sType} onChange={(v) => setSType(v)}>
      <Select.Option value="S_NAME">字典中文名检索</Select.Option>
      <Select.Option value="S_ID">字典标识符检索</Select.Option>
    </Select>
  );

  return (
    <div className={styles.right}>
      <Row>
        <Col span={10} style={{ padding: "0 2rem" }}>
          <Input placeholder="数据名称" />
          <Input placeholder="数据描述" style={{ marginTop: "1rem" }} />
        </Col>
        <Col span={14}>
          <Upload>
            <Button type="primary">
              <UploadOutlined /> 上传
            </Button>
          </Upload>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={10} style={{ padding: "0 2rem" }}>
          <Input addonBefore={selectBefore} />
        </Col>
        <Col span={6}>
          <Button type="primary" title="检索" style={{ marginRight: "1rem" }} onClick={() => console.log(dataMap)}>
            <SearchOutlined /> 检索
          </Button>
          <Button type="primary" title="重置">
            <ReloadOutlined /> 重置
          </Button>
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
          dataSource={dictList}
          size="small"
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default DataForm;
