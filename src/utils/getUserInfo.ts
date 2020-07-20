import { jwtDecode } from './jwtDecode';
import { getToken } from './tokenUtils';
import { UserType } from '../models/user';


// 获取用户信息
const getUserInfo = (): UserType | {[key: string]: string | number} => {
  let userInfo: UserType | {[key: string]: string | number} = {};
  const token = getToken();
  if (token) {
    const payload = jwtDecode(token);
    userInfo = {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      isAdmin: payload.isAdmin,
      area: payload.area,
      areaLabel: payload.areaLabel,
    };
  }
  return userInfo;
}

// 判断用户是否是admin
export const isAdmin = (): boolean => {
  const userInfo = getUserInfo();
  if (userInfo) {
    const { username } = userInfo;
    return username === 'admin';
  }
  return false;
}

export default getUserInfo;
