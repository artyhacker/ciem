import React, { FC, useState } from "react";
import styles from "./Login.module.css";
import { Input, Button, message } from "antd";
import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "./LoginForm";
import { setToken } from "../../utils/tokenUtils";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [visible, setVisible] = useState(false);

  const onLogin = async () => {
    if (username && password) {
      const res = await axiosInstance.post(api.login, { username, password });
      // TODO: 错误处理
      if (isOk(res)) {
        setToken(res.data);
        history.push('/my-data');
        message.success('登录成功，欢迎您！');
      }
    } else {
      message.info('请填写用户名和密码');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Input
          placeholder="请输入用户名"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="请输入密码"
          style={{ margin: "1rem 0" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          style={{ margin: "0 auto", display: "block", width: "8rem" }}
          onClick={onLogin}
        >
          登录
        </Button>
        <Button
          type="link"
          style={{ margin: "0 auto", display: "block" }}
          onClick={() => setVisible(true)}
        >{`注册新账号>>`}</Button>
      </div>
      <LoginForm visible={visible} onClose={() => setVisible(false)} history={history} />
    </div>
  );
};

export default Login;
