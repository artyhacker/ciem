import React, { FC, useState, useCallback } from "react";
import styles from "./styles.module.css";
import DataTypeTree from "./DataTypeTree";
import DataForm from "./DataForm";
import { DataType } from "../../../models/data";
import getUserInfo from "../../../utils/getUserInfo";
import { fetchRegister } from "../utils";
import { CallbackType } from "../../../models/global";

const DataRegisterContainer: FC = () => {
  const [type, setType] = useState<string>("上海市");

  const onRegister = useCallback(
    (data: DataType, cb: CallbackType) => {
      const { name } = getUserInfo();
      const postData: DataType = Object.assign(data, { type, uploader: name });
      fetchRegister(postData, cb);
    },
    [type]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DataTypeTree onSelect={setType} selectedKey={type} />
      </div>
      <DataForm onRegister={onRegister} setType={setType} />
    </div>
  );
};

export default DataRegisterContainer;
