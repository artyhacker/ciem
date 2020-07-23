import React, { FC, useState, useEffect } from "react";
import { Tree } from "antd";
import contents from "../../../assets/contents";

interface Props {
  selectedKey?: string;
  onSelect: (key: string) => void;
}

const DataTypeTree: FC<Props> = ({ selectedKey, onSelect }) => {
  const [key, setKey] = useState<string>(selectedKey || "上海市");

  useEffect(() => {
    if (selectedKey && selectedKey !== key) {
      setKey(selectedKey);
    }
  }, [selectedKey, key]);

  const onSelectLocal = (keys: string[]) => {
    setKey(keys[0]);
    onSelect(keys[0]);
  };

  return (
    <Tree
      selectedKeys={[key]}
      onSelect={(ks) => onSelectLocal(ks as string[])}
      treeData={contents}
      defaultExpandAll
    />
  );
};

export default DataTypeTree;
