import React, { FC, useState, useEffect, useCallback } from "react";
import styles from "../../styles.module.css";
import MyDataSearch from "./DataApplicationSearch";
import DataTypeTree from "../../DataRegister/components/DataTypeTree";
import MyDataTable from "./DataApplicationTable";
import { MyDataType, DataType } from "../../../models/data";
import MyDataDescModal from "./DataApplicationDescModal";
import { fetchData, fetchDataItem } from "../actions";

export type DataSearchType = {
  name?: string;
  describe?: string;
  uploader?: string;
};

const DataApplicationContainer: FC = () => {
  const [list, setList] = useState<MyDataType[]>([]);
  const [type, setType] = useState<string>("上海市");
  const [params, setParams] = useState<DataSearchType>({});
  const [dataSource, setDataSource] = useState<MyDataType[]>([]);

  const [descVisible, setDescVisible] = useState(false);
  const [descItem, setDescItem] = useState<DataType>();

  useEffect(() => {
    const cb = (value: MyDataType[]) => {
      setList(value);
      setDataSource(value);
    };
    fetchData(cb);
  }, []);

  const onSearch = useCallback(
    (newParams: DataSearchType, newType?: string) => {
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
      if (newParams.uploader) {
        prev = prev.filter(
          // @ts-ignore
          (pf) => pf.uploader.indexOf(newParams.uploader as string) > -1
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
    const cb = (resData: DataType) => {
      setDescItem(resData);
      setDescVisible(true);
    };
    fetchDataItem(item, cb);
  }, []);

  const onCloseDesc = useCallback(() => {
    setDescItem(undefined);
    setDescVisible(false);
  }, []);

  const onApply = useCallback((item: MyDataType) => {
    console.log(item);
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
          <MyDataTable dataSource={dataSource} onDesc={onDesc} onApply={onApply} />
        </div>
      </div>
      <MyDataDescModal visible={descVisible} item={descItem} onClose={onCloseDesc} />
    </div>
  );
};

export default DataApplicationContainer;
