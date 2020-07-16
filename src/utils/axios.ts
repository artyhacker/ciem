import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { message } from "antd";
import log from "loglevel";
// import history from "./history";
import { BASE_URL } from "../configs/api";

// TODO: token
// TODO: preLocation

// 身份认证错误
function AuthenticationError(message: string) {
  // @ts-ignore
  this.name = "AuthenticationError";this.message = message;this.stack = new Error().stack;
}
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const onFullFilled = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onRejected = (err: any): any => {
  log.error(`${err}`);
  message.info("操作失败", 1);
  return err;
};

const requestOnFullFilled = (request: AxiosRequestConfig) => {
  return request;
  // const token = getToken();
  // if (token) {
  //   return Object.assign(request, { headers: { ...request.headers, Authorization: `Bearer ${token}` } });
  // }
  // message.error('登陆信息过期，请重新登陆');
  // setPreLocation();
  // history.push('/login');
  // return new AuthenticationError('请重新登录');
};

axiosInstance.interceptors.response.use(onFullFilled, onRejected);
axiosInstance.interceptors.request.use(requestOnFullFilled);

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

export const isOk = (res: void | AxiosResponse): boolean =>
  !!res && res.status >= 200 && res.status < 300;

export default axiosInstance;
