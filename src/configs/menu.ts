import Dict from '../components/Dict';
import DataRegister from '../components/DataRegister';
import MyData from '../components/MyData';
import DataApplication from '../components/DataApplication';
import MyApplication from '../components/MyApplication';
import MyApprove from '../components/MyApprove';
import Efficacy from '../components/Efficacy';

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

export default menuConfig;
