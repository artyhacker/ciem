import axiosInstance, { isOk } from "../../utils/axios"
import api from "../../configs/api"
import { CallbackType } from "../../models/global";
import { message } from "antd";
import { MyDataType } from "../../models/data";

export const fetchMyData = async (cb: CallbackType) => {
  const res = await axiosInstance.get(`${api.data}/user`)
    .catch(e => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  } else {
    message.error('获取数据列表失败');
  }
};

export const fetchMyDataItem = async (item: MyDataType, cb: CallbackType) => {
  const res = await axiosInstance.get(`${api.data}/${item.id}`)
    .catch(e => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  } else {
    message.error('获取数据详情失败');
  }
};
