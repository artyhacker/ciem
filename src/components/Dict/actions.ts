import axiosInstance, { isOk } from '../../utils/axios';
import api from '../../configs/api';
import { message } from 'antd';
import { DictType } from '../../models/dict';
import { CallbackType } from '../../models/global';

export const fetchList = async (cb: CallbackType) => {
  const res = await axiosInstance.get(api.dict);
  if (isOk(res)) {
    cb(res.data);
  } else {
    message.error('获取字典数据失败');
  }
}

export const fetchPost = async (data: DictType[], cb: (data: any) => void) => {
  const res = await axiosInstance.post(api.dict, data);
  if (isOk(res)) {
    cb(res.data);
  } else {
    message.error('导入失败');
  }
}