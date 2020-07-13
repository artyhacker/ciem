import Empty from '../components/Empty';

export type MenuItemType = {
  path: string;
  label: string;
  component: React.FC;
  auth: 0 | 1;  // 1为仅管理员可见，0为不设限
}

const menuConfig: MenuItemType[] = [
  {
    path: 'dict',
    label: '字典导入',
    component: Empty,
    auth: 1,
  },
  {
    path: 'register',
    label: '数据注册',
    component: Empty,
    auth: 0,
  },
  {
    path: 'my-data',
    label: '我的数据',
    component: Empty,
    auth: 0,
  },
  {
    path: 'apply',
    label: '数据申请',
    component: Empty,
    auth: 0,
  },
  {
    path: 'my-apply',
    label: '我的申请',
    component: Empty,
    auth: 0,
  },
  {
    path: 'approve',
    label: '我的审批',
    component: Empty,
    auth: 1,
  },
  {
    path: 'assess',
    label: '效能评估',
    component: Empty,
    auth: 1,
  },
];

export default menuConfig;
