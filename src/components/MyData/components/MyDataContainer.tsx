import React, { FC, useState, useEffect, useCallback } from "react";
import styles from "../../styles.module.css";
import MyDataSearch from "./MyDataSearch";
import DataTypeTree from "../../DataRegister/components/DataTypeTree";
import MyDataTable from "./MyDataTable";
import { fetchMyData, fetchMyDataItem, fetchDelMyData, fetchOriginData } from "../actions";
import { MyDataType, DataType } from "../../../models/data";
import MyDataDescModal from "./MyDataDescModal";
import { message } from "antd";
import OriginDataModal from "./OriginDataModal";

export type MyDataSearchType = {
  name?: string;
  describe?: string;
};

export type OriginDataType = { [key: string]: string };

const MyDataContainer: FC = () => {
  const [list, setList] = useState<MyDataType[]>([]);
  const [type, setType] = useState<string>("上海市");
  const [params, setParams] = useState<MyDataSearchType>({});
  const [dataSource, setDataSource] = useState<MyDataType[]>([]);

  const [descVisible, setDescVisible] = useState(false);
  const [descItem, setDescItem] = useState<DataType>();

  const [spinning, setSpinning] = useState(false);

  const [originVisible, setOriginVisible] = useState(false);
  const [originData, setOriginData] = useState<OriginDataType[]>([]);

  useEffect(() => {
    const cb = (value: MyDataType[]) => {
      setList(value);
      setDataSource(value);
    };
    fetchMyData(cb);
  }, []);

  const onSearch = useCallback(
    (newParams: MyDataSearchType, newType?: string) => {
      const searchType = newType || type;
      let prev = list.filter((lf) => lf.type.indexOf(searchType) === 0);
      if (newParams.name) {
        prev = prev.filter(
          (pf) => pf.name.indexOf(newParams.name as string) > -1
        );
      }
      if (newParams.describe) {
        prev = prev.filter(
          (pf) => pf.describe.indexOf(newParams.describe as string) > -1
        );
      }
      setDataSource(prev);
    },
    [type, list]
  );

  const onSelectType = useCallback(
    (value) => {
      setType(value);
      onSearch(params, value);
    },
    [onSearch, params]
  );

  const onReset = useCallback(() => {
    setParams({});
    onSearch({});
  }, [onSearch]);

  const onDesc = useCallback((item: MyDataType) => {
    setSpinning(true);
    const cb = (resData: DataType) => {
      setDescItem(resData);
      setDescVisible(true);
      setSpinning(false);
    };
    fetchMyDataItem(item, cb);
  }, []);

  const onCloseDesc = useCallback(() => {
    setDescItem(undefined);
    setDescVisible(false);
  }, []);

  const onDel = useCallback((item: MyDataType) => {
    const cb = () => {
      setList(prev => (prev.filter(pf => pf.id !== item.id)));
      setDataSource(prev => (prev.filter(pf => pf.id !== item.id)));
      message.success('删除成功');
    };
    fetchDelMyData(item, cb);
  }, []);

  const getOriginData = useCallback((item: MyDataType) => {
    setSpinning(true);
    const cb = (resData: any) => {
      setSpinning(false);
      if (resData && resData.length) {
        setOriginData(resData);
        setOriginVisible(true);
      } else {
        message.info('未找到原始数据');
      }
    };
    fetchOriginData(item, cb);
  }, []);

  const onCloseOrigin = useCallback(() => {
    setOriginVisible(false);
    setOriginData([]);
  }, []);

  return (
    <div className={styles.container}>
      <MyDataSearch
        params={params}
        setParams={setParams}
        onSearch={onSearch}
        onReset={onReset}
      />
      <div className={styles.content}>
        <div className={styles.left}>
          <DataTypeTree selectedKey={type} onSelect={onSelectType} />
        </div>
        <div className={styles.right}>
          <MyDataTable dataSource={dataSource} onDesc={onDesc} onDel={onDel} spinning={spinning} getOriginData={getOriginData} />
        </div>
      </div>
      <MyDataDescModal visible={descVisible} item={descItem} onClose={onCloseDesc} />
      <OriginDataModal visible={originVisible} data={originData} onClose={onCloseOrigin} />
    </div>
  );
};

export default MyDataContainer;
