import React, { FC } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const fileNameStyle = {
  lineHeight: "30px",
  border: "1px dashed grey",
  borderRadius: "5px",
  padding: "0 1rem",
  marginRight: "1rem",
};

const EXCEL_TYPE_LIST = ['xls', 'xlsx', 'csv'];

const DictUploader: FC = () => {
  const beforeUpload = (file: RcFile) => {
    console.log(file);
    const fileType = file.name.slice(file.name.lastIndexOf('.') + 1);
    if (EXCEL_TYPE_LIST.includes(fileType)) {
      console.log('ok');
      // TODO: 解析Excel
    } else {
      message.error('文件格式错误');
    }
    return false;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={fileNameStyle}>
        <span>点击右侧按钮导入Excel文件</span>
      </div>
      <Upload fileList={[]} action="" beforeUpload={beforeUpload}>
        <Button type="primary">
          <UploadOutlined /> 导入
        </Button>
      </Upload>
    </div>
  );
};

export default DictUploader;
