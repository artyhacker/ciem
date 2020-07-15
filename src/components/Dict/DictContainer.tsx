import React, { FC, useState } from "react";
import DictUploader from './DictUploader';
import styles from "../styles.module.css";
import DictTable from "./DictTable";
import { Divider } from "antd";

const DictContainer: FC = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <DictUploader setLoading={setLoading} />
      <Divider />
      <div style={{ width: '100%', height: '100%' }}>
        <DictTable isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DictContainer;
