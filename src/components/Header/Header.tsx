import React, { FC, useState, useEffect } from 'react';
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
  const [time, setTime] = useState(moment().format('YYYY.MM.DD HH:mm'));

  useEffect(() => {
    const i = setInterval(() => {
      setTime(moment().format('YYYY.MM.DD HH:mm'));
    }, 2000);
    return () => clearInterval(i);
  }, []);

  const fetchLogout = async () => {
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
        <div className={styles['logo-time']}/>
        <span style={{ fontSize: '16px', margin: '0 1rem', flex: '1' }}>{time}</span>
        <Popconfirm title="确认退出？" onConfirm={fetchLogout} placement="leftBottom">
          <div className={styles['logo-logout']} title="退出登录"/>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Header;
