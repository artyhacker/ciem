import areaData from '../assets/china-area.json';

type AreaJsonValue = {[k: string]: string};
type AreaJsonType = {
   [key: string]: AreaJsonValue;
};

type AreaType = {
  value: string;
  label: string;
  children?: AreaType[];
};

const generateAreaData = (key: string, data: AreaJsonType): AreaType[] => {
  const d = data[key];
  const keys = Object.keys(d);
  return keys.map((k: string) => {
    return ({
      value: k,
      label: d[k],
      children: data[k] ? generateAreaData(k, data) : undefined,
    });
  });
};

const getAreaData = () => generateAreaData('86', areaData);

// 邮编转为["120000", "120400", "120506"]的形式
export const areaNumber2Array = (v: number): [string, string, string] => {
  return ([
    (Math.floor(v / 10000) * 10000).toString(),
    (Math.floor(v / 100) * 100).toString(),
    v.toString(),
  ]);
};

export default getAreaData;
