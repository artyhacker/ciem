import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";
import { MyDataType } from "../../models/data";

export const fetchData = async (cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.data}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchDataItem = async (item: MyDataType, cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.data}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchDelData = async (item: MyDataType, cb: CallbackType) => {
  const res = await axiosInstance
    .delete(`${api.data}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};
