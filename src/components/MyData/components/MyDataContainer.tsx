import React, { FC, useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import MyDataSearch from "./MyDataSearch";
import DataTypeTree from "../../DataRegister/components/DataTypeTree";
import MyDataTable from "./MyDataTable";
import { fetchMyData } from "../actions";
import { MyDataType } from "../../../models/data";

export type MyDataSearchType = {
  name?: string;
  describe?: string;
};

const MyDataContainer: FC = () => {
  const [list, setList] = useState<MyDataType[]>([]);
  const [type, setType] = useState<string>("上海市");
  const [params, setParams] = useState<MyDataSearchType>({});
  const [dataSource, setDataSource] = useState<MyDataType[]>([]);

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
          <MyDataTable dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};

export default MyDataContainer;
