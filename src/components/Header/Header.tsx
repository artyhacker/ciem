import React, { FC } from 'react';
import { ClockCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './Header.module.css';
import { SYSTEM_TITLE } from '../../models/global';
import { Popconfirm, message } from 'antd';
import axiosInstance, { isOk } from '../../utils/axios';
import api from '../../configs/api';
import { clearToken } from '../../utils/tokenUtils';
import { History } from 'history';

interface Props {
  history: History;
}

const Header: FC<Props> = ({ history }) => {
  const onLogout = async () => {
    const res = await axiosInstance.get(api.logout);
    if (isOk(res)) {
      history.push('/login');
      message.success('您已安全退出！');
      clearToken();
    } else {
      message.error('操作失败');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}/>
      <div className={styles.title}>{SYSTEM_TITLE}</div>
      <div className={styles.time}>
        <ClockCircleOutlined />
        <span style={{ fontSize: '16px', margin: '0 1rem' }}>{moment().format('YYYY.MM.DD HH:mm')}</span>
        <Popconfirm title="退出登录？" onConfirm={onLogout}>
          <LogoutOutlined />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Header;
