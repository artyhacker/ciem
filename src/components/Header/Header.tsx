import React, { FC, useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "./Header.module.css";
import { SYSTEM_TITLE } from "../../models/global";
import { Popconfirm, message } from "antd";
import axiosInstance, { isOk } from "../../utils/axios";
import api from "../../configs/api";
import { clearToken } from "../../utils/tokenUtils";
import { History } from "history";
import { clearPreLocation } from "../../utils/preLocationUtils";
import getUserInfo from "../../utils/getUserInfo";

interface Props {
  history: History;
}

const Header: FC<Props> = ({ history }) => {
  const [time, setTime] = useState(moment().format("YYYY.MM.DD HH:mm"));

  useEffect(() => {
    const i = setInterval(() => {
      setTime(moment().format("YYYY.MM.DD HH:mm"));
    }, 2000);
    return () => clearInterval(i);
  }, []);

  const fetchLogout = async () => {
    const res = await axiosInstance.get(`${api.login}/${getUserInfo().id}`);
    if (isOk(res)) {
      history.push("/login");
      clearToken();
      clearPreLocation();
      message.success("您已安全退出！");
      clearToken();
    } else {
      message.error("操作失败");
    }
  };

  const { name } = getUserInfo();

  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.title}>{SYSTEM_TITLE}</div>
      <div className={styles.time}>
        <span className={styles["logo-time"]} />
        <div style={{ fontSize: "16px", margin: "0 1rem" }}>{time}</div>
        <div style={{ fontSize: "16px", marginRight: "2rem" }}>
          <UserOutlined style={{ fontSize: "1.3rem", marginRight: ".5rem" }} />
          {name}
        </div>
        <Popconfirm
          title="确认退出？"
          onConfirm={fetchLogout}
          placement="leftBottom"
        >
          <div className={styles["logo-logout"]} title="退出登录" />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Header;
