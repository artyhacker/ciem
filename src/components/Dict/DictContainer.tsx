import React, { FC, useState, useEffect } from "react";
import DictUploader from './DictUploader';
import styles from "./styles.module.css";
import DictTable from "./DictTable";
import { Divider } from "antd";
import { DictType } from "../../models/dict";
import { fetchList, fetchPost } from "./actions";

const DictContainer: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState<DictType[]>([]);

  useEffect(() => {
    fetchList(setList);
  }, []);

  const fetchUpload = (data: DictType[]) => {
    fetchPost(data, setList);
  };

  return (
    <div className={styles.container}>
      <DictUploader setLoading={setLoading} fetchUpload={fetchUpload} />
      <Divider />
      <div style={{ width: '100%', height: '100%' }}>
        <DictTable isLoading={isLoading} data={list} />
      </div>
    </div>
  );
};

export default DictContainer;
