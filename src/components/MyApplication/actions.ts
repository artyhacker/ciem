import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";
import { MyApplicationType, DataApplicationType } from "../../models/dataApplication";

export const fetchList = async (cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.apply}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchItem = async (item: MyApplicationType, cb: CallbackType) => {
  const res = await axiosInstance
    .get(`${api.apply}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchDel = async (item: MyApplicationType, cb: CallbackType) => {
  const res = await axiosInstance
    .delete(`${api.apply}/${item.id}`)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchEdit = async (item: DataApplicationType, cb: CallbackType) => {
  const res = await axiosInstance
    .put(`${api.apply}/${item.id}`, item)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};
