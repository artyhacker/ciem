import React, { FC, useState, useMemo } from "react";
import efficacyData from "../../../assets/efficacy.json";
import styles from "./styles.module.css";
import EfficacyChart from "./EfficacyChart";
import DataTypeTree from "../../DataRegister/components/DataTypeTree";

export type EfficacyData = { label: string; value: number; parent: string };

const EfficacyContainer: FC = () => {
  const [type, setType] = useState<string>("上海市");

  const data = useMemo<EfficacyData[]>(
    () => {
      const t = type.substring(type.lastIndexOf('-') + 1);
      console.log(t);
      return efficacyData.filter((e: EfficacyData) => e.parent === t);
    },
    [type]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DataTypeTree selectedKey={type} onSelect={setType} />
      </div>
      <div className={styles.right}>
        <EfficacyChart data={data} />
      </div>
    </div>
  );
};

export default EfficacyContainer;
