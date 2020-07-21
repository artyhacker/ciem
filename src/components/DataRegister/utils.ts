import { DataType } from "../../models/data";
import { message } from "antd";

export const validateForm = (item: DataType): boolean => {
  if (!item.name || !item.describe || !item.ip || !item.port) {
    message.warn('表单填写不完整');
    return false;
  }
  if (!item.data.length) {
    message.warn('未上传数据源Excel文件');
    return false;
  }
  if (!item.dataMap.length) {
    message.warn('未进行任何数据映射');
    return false;
  }
  return item.dataMap.every(d => {
    if (d.id && d.name) {
      return true;
    }
    message.warn(`元字典标识符“${d.dictId}”映射不完整`, 8);
    return false;
  })
};
