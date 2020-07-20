type DataMapType = {
  id: string;
  name: string;
  dictId: string;
};

type ExcelDataType = { [key: string ]: string };

export type DataType = {
  id: string;
  name: string;
  describe: string;
  type: string;
  dataMap: DataMapType[];
  data: ExcelDataType;
  tableName: string;
  uploader: string;
  ip: string;
  port: string;
  protocol: string;
  method: string;
}