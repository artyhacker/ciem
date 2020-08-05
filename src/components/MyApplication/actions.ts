import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { CallbackType } from "../../models/global";
import {
  MyApplicationType,
  DataApplicationType,
} from "../../models/dataApplication";
import { message } from "antd";

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

export const fetchEdit = async (
  item: DataApplicationType,
  cb: CallbackType
) => {
  const res = await axiosInstance
    .put(`${api.apply}/${item.id}`, item)
    .catch((e) => e.response || e);
  if (isOk(res)) {
    cb(res.data);
  }
};

export const fetchDownload = async (
  item: MyApplicationType,
  cb?: CallbackType
) => {
  const res = await axiosInstance
    .get(`${api.apply}/download/xml-en/${item.id}`, {
      headers: {
        Accept: "application/octet-stream,application/json",
        "Content-Type": "application/json",
      },
      // responseType: "blob",
    })
    .catch((e) => e.response || e);
  if (isOk(res)) {
    if (typeof cb === 'function') {
      cb(res.data);
    }
    const url = window.URL.createObjectURL(new Blob([res.data as BlobPart]));
    const a = document.createElement('a');
    a.href = url;
    const h: string = res.headers['content-disposition'];
    let filename = '下载文件';
    const startIndex = h.indexOf(`filename*=UTF-8''`);
    if (startIndex > -1) {
      filename = decodeURI(h.substring(startIndex + 17));
    }
    a.download = filename;
    a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    message.success(`${filename} 下载成功`);
  }
};
