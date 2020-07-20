import React, { FC, useState } from "react";
import styles from "./Login.module.css";
import { Input, Button, message } from "antd";
import axios from 'axios';
import { isOk } from "../../utils/axios";
import api, { BASE_URL } from "../../configs/api";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "./LoginForm";
import { setToken } from "../../utils/tokenUtils";
import { SYSTEM_TITLE } from "../../models/global";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [visible, setVisible] = useState(false);

  const onLogin = async () => {
    if (username && password) {
      const res = await axios.create({ baseURL: BASE_URL }).post(api.login, { username, password }).catch(e => {
        return e.response || e;
      });
      if (isOk(res)) {
        setToken(res.data);
        history.push('/my-data');
        message.success('登录成功，欢迎您！');
      } else {
        message.error(res.data || '登录发生错误');
      }
    } else {
      message.info('请填写用户名和密码');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo} />
        <div className={styles.title}>{SYSTEM_TITLE}</div>
      </div>
      <div className={styles.form}>
        <div className={styles['form-title']}>用户登录</div>
        <Input
          placeholder="请输入用户名"
          autoFocus
          value={username}
          style={{ marginTop: '1rem' }}
          onChange={(e) => setUsername(e.target.value)}
          onPressEnter={onLogin}
        />
        <Input
          placeholder="请输入密码"
          type="password"
          style={{ margin: "1.5rem 0" }}
          value={password}
          onPressEnter={onLogin}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          style={{ margin: "0 auto", display: "block", width: "10rem" }}
          onClick={onLogin}
        >
          登录
        </Button>
        <Button
          type="link"
          style={{ margin: "0 auto", display: "block", color: '#FFF' }}
          onClick={() => setVisible(true)}
        >{`注册新账号>>`}</Button>
      </div>
      <LoginForm visible={visible} onClose={() => setVisible(false)} history={history} />
    </div>
  );
};

export default Login;
