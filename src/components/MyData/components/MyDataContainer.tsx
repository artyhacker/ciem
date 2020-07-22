import React, { FC, useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import MyDataSearch from './MyDataSearch';
import DataTypeTree from '../../DataRegister/components/DataTypeTree';
import MyDataTable from './MyDataTable';
import { fetchMyData } from '../actions';
import { MyDataType } from '../../../models/data';

const MyDataContainer: FC = () => {
  const [list, setList] = useState<MyDataType[]>([]);
  const [type, setType] = useState<string>('上海市');

  useEffect(() => {
    fetchMyData(setList);
  }, []);

  const dataSource = useMemo(() => {
    return list.filter(lf => lf.type.indexOf(type) === 0);
  }, [type, list]);

  return (
    <div className={styles.container}>
      <MyDataSearch />
      <div className={styles.content}>
        <div className={styles.left}>
          <DataTypeTree selectedKey={type} onSelect={setType} />
        </div>
        <div className={styles.right}>
          <MyDataTable dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};

export default MyDataContainer;
