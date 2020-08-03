import React, { FC, useState, useCallback } from "react";
import styles from "./styles.module.css";
import DataTypeTree from "./DataTypeTree";
import DataForm from "./DataForm";
import { DataType } from "../../../models/data";
import getUserInfo from "../../../utils/getUserInfo";
import { fetchRegister, fetchPut } from "../utils";
import { CallbackType } from "../../../models/global";
import { message } from "antd";

const DataRegisterContainer: FC = () => {
  const [type, setType] = useState<string>();

  const onRegister = useCallback(
    (data: DataType, cb: CallbackType, isEdit: boolean, errCb: () => void) => {
      if (!type) {
        message.info('请在左侧选择数据目录');
        errCb();
        return;
      }
      const { name } = getUserInfo();
      const postData: DataType = Object.assign(data, { type, uploader: name });
      if (isEdit) {
        fetchPut(postData, cb);
      } else {
        fetchRegister(postData, cb);
      }
    },
    [type]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DataTypeTree onSelect={setType} selectedKey={type} onlySelectLeaf />
      </div>
      <DataForm onRegister={onRegister} setType={setType} />
    </div>
  );
};

export default DataRegisterContainer;
