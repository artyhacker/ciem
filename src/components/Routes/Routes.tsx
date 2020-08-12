import React, { FC, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import menuConfig, { MenuItemType } from "../../configs/menu";

const AppRouter: FC = () => {
  const firstPageUrl = process.env.REACT_APP_TYPE === 'applicant' ? '/my-apply' : 'my-data';

  return (
    <Suspense fallback={<div>页面发生错误</div>}>
      <Switch>
        {menuConfig.map((menu: MenuItemType) => (
          <Route key={menu.path} path={menu.path} component={menu.component} />
        ))}
        <Redirect exact from="/" to={firstPageUrl} />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
