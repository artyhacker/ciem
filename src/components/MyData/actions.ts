import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";
import { MyDataType } from "../../models/data";

export const fetchMyData = async (cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.data}/user`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchMyDataItem = async (item: MyDataType, cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.data}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchDelMyData = async (item: MyDataType, cb: CallbackType) => {
  const res = await axiosInstance
    .delete(`${api.data}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchOriginData = async (item: MyDataType, cb: CallbackType) => {
  const res1 = await axiosInstance
    .get(`${api.data}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res1) && res1.data && res1.data.tableName) {
    const res = await axiosInstance
      .get(`${api.register}/${res1.data.tableName}`)
      .catch((e) => e.response || e);
    if (isOk(res)) {
      cb(res.data);
    }
  }
};
