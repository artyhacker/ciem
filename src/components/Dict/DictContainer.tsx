import React, { FC } from "react";
import DictUploader from './DictUploader';
import styles from "../styles.module.css";
import DictTable from "./DictTable";
import { Divider } from "antd";

const DictContainer: FC = () => {
  return (
    <div className={styles.container}>
      <DictUploader />
      <Divider />
      <DictTable />
    </div>
  );
};

export default DictContainer;
