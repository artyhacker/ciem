import React, { FC, useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import menuConfig from "../../configs/menu";
import { isAdmin } from "../../utils/user";

const MenuComponent: FC = () => {
  const menuList = isAdmin ? menuConfig : menuConfig.filter(m => m.auth === 0);
  
  const [keys, setKeys] = useState<string[]>([window.location.pathname]);
  useEffect(() => setKeys([window.location.pathname]), []);

  return (
    <Menu
      selectedKeys={keys}
      mode="vertical"
      onClick={(e) => setKeys([e.key as string])}
    >
      {menuList.map((menu) => (
        <Menu.Item key={menu.path} style={{ textAlign: 'center' }}>
          <Link to={menu.path}>{menu.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuComponent;
