export type DataMapType = {
  id: string;
  name: string;
  dictId: string;
  dictName: string;
};

export type ExcelDataType = { [key: string ]: string };

export type DataType = {
  id?: string;
  name: string;
  describe: string;
  type: string;
  dataMap: DataMapType[];
  data: ExcelDataType[];
  tableName: string;
  uploader: string;
  ip: string;
  port: string;
  protocol: string;
  method: string;
}

export const DEFAULT_DATA: DataType = {
  name: '',
  describe: '',
  type: '',
  dataMap: [],
  data: [],
  tableName: '',
  uploader: '',
  ip: '',
  port: '',
  protocol: 'HTTP',
  method: 'POST',
};

export type MyDataType = {
  id: string;
  name: string;
  describe: string;
  type: string;
  isEdit: 0 | 1;
};
