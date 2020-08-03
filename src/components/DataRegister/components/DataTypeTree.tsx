import React, { FC, useState, useEffect, useMemo } from "react";
import { Tree } from "antd";
import contents from "../../../assets/contents";

interface Props {
  selectedKey?: string;
  onSelect: (key: string) => void;
  onlySelectLeaf?: boolean;
}

// @ts-ignore
const getOnlyLeafContents = (c) => {
  // @ts-ignore
  return c.map(cm => {
    if (cm.children && cm.children.length) {
      return { ...cm, disabled: true, children: getOnlyLeafContents(cm.children) };
    }
    return cm;
  });
}

const DataTypeTree: FC<Props> = ({ selectedKey, onSelect, onlySelectLeaf }) => {
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

  const treeData = useMemo(() => (onlySelectLeaf ? getOnlyLeafContents(contents) : contents), [onlySelectLeaf]);

  return (
    <Tree
      selectedKeys={[key]}
      onSelect={(ks) => onSelectLocal(ks as string[])}
      treeData={treeData}
      defaultExpandAll
    />
  );
};

export default DataTypeTree;
