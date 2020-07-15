import React, { FC, useState } from "react";
import DictUploader from './DictUploader';
import styles from "../styles.module.css";
import DictTable from "./DictTable";
import { Divider } from "antd";
import { DictType } from "../../models/dict";

const DictContainer: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState<DictType[]>([]);

  const fetchUpload = (data: DictType[]) => {
    setList(data);
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
