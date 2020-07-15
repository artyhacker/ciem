export type DictType = {
  id: string;
  name: string;
};

export const DictColumns = [
  {
    dataIndex: "id",
    title: "CIEM数据元字典标识符",
  },
  {
    dataIndex: "name",
    title: "CIEM数据元字典中文名称",
  },
];

export const getDictMockData = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push({ id: i, name: `Name${i}` });
  }
  return result;
};
