import React, { FC } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import menuConfig from "../../configs/menu";

const MenuComponent: FC = () => {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="vertical"
    >
      {menuConfig.map((menu) => (
        <Menu.Item key={menu.path} style={{ textAlign: 'center' }}>
          <Link to={`/${menu.path}`}>{menu.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuComponent;
