import React, { FC, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import XLSX from "xlsx";
import { DictType } from "../../models/dict";
import DictUploaderPreview from "./DictUploaderPreview";

interface Props {
  setLoading: (isLoading: boolean) => void;
  fetchUpload: (data: DictType[]) => void;
}

const fileNameStyle = {
  lineHeight: "30px",
  border: "1px dashed grey",
  borderRadius: "5px",
  padding: "0 1rem",
  marginRight: "1rem",
};

const parseXData = (data: { [key: string]: { v: string } }): DictType[] => {
  let index = 1;
  const result: DictType[] = [];
  while (data[`A${index}`]) {
    result.push({ name: data[`A${index}`].v, id: data[`B${index}`].v });
    index += 1;
  }
  return result;
};

const EXCEL_TYPE_LIST = ["xls", "xlsx", "csv"];

const DictUploader: FC<Props> = ({ setLoading, fetchUpload }) => {
  const [preVisible, setPreVisible] = useState(false);
  const [data, setData] = useState<DictType[]>([]);

  const onOk = (importData: DictType[]) => {
    fetchUpload(importData);
    setPreVisible(false);
    setData([]);
  };

  const onCancel = () => {
    setPreVisible(false);
    setData([]);
  };

  const beforeUpload = (file: RcFile) => {
    const fileType = file.name.slice(file.name.lastIndexOf(".") + 1);
    if (EXCEL_TYPE_LIST.includes(fileType)) {
      setLoading(true);
      const fr = new FileReader();
      fr.readAsBinaryString(file);
      fr.onload = () => {
        const readResult = XLSX.read(fr.result, { type: "binary" });
        const xData = readResult.Sheets[readResult.SheetNames[0]];
        setData(parseXData(xData));
        setPreVisible(true);
        setLoading(false);
      };
      fr.onerror = () => {
        message.error("文件读取失败");
        setLoading(false);
      };
      return false;
    } else {
      message.error("文件格式错误");
    }
    return false;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={fileNameStyle}>
        <span>点击右侧按钮导入Excel文件</span>
      </div>
      <Upload action="#" beforeUpload={beforeUpload} fileList={[]}>
        <Button type="primary">
          <UploadOutlined /> 导入
        </Button>
      </Upload>
      <DictUploaderPreview
        visible={preVisible}
        onOk={onOk}
        onCancel={onCancel}
        data={data}
      />
    </div>
  );
};

export default DictUploader;
