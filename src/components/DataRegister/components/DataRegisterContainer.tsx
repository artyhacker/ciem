import React, { FC, useState, useCallback } from "react";
import styles from "./styles.module.css";
import DataTypeTree from "./DataTypeTree";
import DataForm from "./DataForm";
import { DataType } from "../../../models/data";
import getUserInfo from "../../../utils/getUserInfo";

const DataRegisterContainer: FC = () => {
  const [type, setType] = useState<string>("上海市");

  const onRegister = useCallback(
    (data: DataType) => {
      const { name } = getUserInfo();
      const postData: DataType = Object.assign(data, { type, name });
      console.log(postData);
    },
    [type]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DataTypeTree onSelect={setType} selectedKey={type} />
      </div>
      <DataForm onRegister={onRegister} />
    </div>
  );
};

export default DataRegisterContainer;
