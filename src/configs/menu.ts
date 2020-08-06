import Dict from '../components/Dict';
import DataRegister from '../components/DataRegister';
import MyData from '../components/MyData';
import DataApplication from '../components/DataApplication';
import MyApplication from '../components/MyApplication';
import MyApprove from '../components/MyApprove';
import Efficacy from '../components/Efficacy';

/**
 * 切换菜单时修改此变量
 * user: 普通用户/管理员
 * uploader: 数据上传者页面
 * applicant: 数据申请者页面
 */
const USER_ROLE: 'user' | 'uploader' | 'applicant' = 'user';

export type MenuItemType = {
  path: string;
  label: string;
  component: React.FC;
  auth: 0 | 1;  // 1为仅管理员可见，0为不设限
}

const menuConfig: MenuItemType[] = [
  {
    path: '/dict',
    label: '字典导入',
    component: Dict,
    auth: 1,
  },
  {
    path: '/register',
    label: '数据注册',
    component: DataRegister,
    auth: 0,
  },
  {
    path: '/my-data',
    label: '我的数据',
    component: MyData,
    auth: 0,
  },
  {
    path: '/apply',
    label: '数据申请',
    component: DataApplication,
    auth: 0,
  },
  {
    path: '/my-apply',
    label: '我的申请',
    component: MyApplication,
    auth: 0,
  },
  {
    path: '/approve',
    label: '我的审批',
    component: MyApprove,
    auth: 1,
  },
  {
    path: '/assess',
    label: '效能评估',
    component: Efficacy,
    auth: 1,
  },
];

const menuConfigUploader: MenuItemType[] = [
  {
    path: '/my-data',
    label: '我的数据',
    component: MyData,
    auth: 0,
  },
];

const menuConfigApplicant: MenuItemType[] = [
  {
    path: '/my-apply',
    label: '我的申请',
    component: MyApplication,
    auth: 0,
  },
];

// @ts-ignore
export default USER_ROLE === 'uploader' ? menuConfigUploader : USER_ROLE === 'applicant' ? menuConfigApplicant : menuConfig;
