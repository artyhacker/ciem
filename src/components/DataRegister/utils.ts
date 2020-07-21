import { DataType } from "../../models/data";
import { message } from "antd";
import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";

export const validateForm = (item: DataType): boolean => {
  if (!item.name || !item.describe || !item.ip || !item.port) {
    message.warn("表单填写不完整");
    return false;
  }
  if (!item.data.length) {
    message.warn("未上传数据源Excel文件");
    return false;
  }
  if (!item.dataMap.length) {
    message.warn("未进行任何数据映射");
    return false;
  }
  return item.dataMap.every((d) => {
    if (d.id && d.name) {
      return true;
    }
    message.warn(`元字典标识符“${d.dictId}”映射不完整`, 8);
    return false;
  });
};

export const fetchRegister = async (data: DataType, cb: CallbackType) => {
  const res = await axiosInstance.post(api.data, data).catch((e) => {
    console.log(e);
    return e.response;
  });
  if (isOk(res)) {
    message.success("注册成功");
    if (typeof cb === "function") {
      cb(res.data);
    }
  } else {
    message.error('注册失败');
  }
};
