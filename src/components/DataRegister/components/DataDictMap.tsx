import React, {
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { DataMapType } from "./DataForm";
import { DictType } from "../../../models/dict";
import * as dictActions from "../../Dict/actions";
import { Input, Select, Row, Col, Table } from "antd";

interface Props {
  dataMap: DataMapType;
  setDataMap: Dispatch<SetStateAction<DataMapType>>;
}

const getDataMapValue = (
  dataMap: DataMapType,
  id: string
): { id: string; name: string } => {
  if (!dataMap[id]) {
    return { id: "", name: "" };
  }
  return dataMap[id];
};

const DataDictMap: FC<Props> = ({ dataMap, setDataMap }) => {
  const [dictFilter, setDictFilter] = useState<string>();
  const [dictFilterType, setDictFilterType] = useState<"name" | "id">("name");
  const [dictList, setDictList] = useState<DictType[]>([]);

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
              onChange={(e) => {
                e.persist();
                setDataMap((prev) => ({
                  ...prev,
                  [r.id]: { name: value.name, dictId: r.id, dictName: r.name, id: e.target.value },
                }));
              }}
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
              onChange={(e) => {
                e.persist();
                setDataMap((prev) => ({
                  ...prev,
                  [r.id]: { id: value.id, dictId: r.id, dictName: r.name, name: e.target.value },
                }));
              }}
            />
          );
        },
        width: "25%",
      },
    ],
    [dataMap, setDataMap]
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
    <>
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
          pagination={{
            defaultPageSize: 20,
            showQuickJumper: true,
          }}
        />
      </div>
    </>
  );
};

export default DataDictMap;
