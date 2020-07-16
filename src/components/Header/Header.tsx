import React, { FC } from 'react';
import { ClockCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './Header.module.css';
import { SYSTEM_TITLE } from '../../models/global';
import { Popconfirm, message } from 'antd';

const Header: FC = () => {
  const onLogout = () => {
    // TODO: 退出登录
    message.success('您已安全退出！');
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>icon</div>
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