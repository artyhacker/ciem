import { DataType } from "../../models/data";
import { message } from "antd";
import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";

export const validateForm = (item: DataType, isEdit?: boolean): boolean => {
  console.log(isEdit);
  if (!item.name || !item.describe || !item.ip || !item.port) {
    message.warn("表单填写不完整");
    return false;
  }
  if (!isEdit && (!item.data || !item.data.length)) {
    message.warn("未上传数据源Excel文件");
    return false;
  }
  if (!item.dataMap || !item.dataMap.length) {
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
    if (typeof cb === "function") {
      cb(res.data);
    }
  } else {
    message.error("注册失败");
  }
};

export const fetchPut = async (data: DataType, cb: CallbackType) => {
  const res = await axiosInstance.put(`${api.data}/${data.id}`, data).catch((e) => {
    console.log(e);
    return e.response;
  });
  if (isOk(res)) {
    if (typeof cb === "function") {
      cb(res.data);
    }
  } else {
    message.error("编辑失败");
  }
};

export const fetchDataItem = async (id: string, cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.data}/${id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  } else {
    message.error("获取数据详情失败");
  }
};
