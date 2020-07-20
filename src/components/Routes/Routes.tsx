import React, { FC, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import menuConfig from "../../configs/menu";

const AppRouter: FC = () => {
  return (
    <Suspense fallback={<div>页面发生错误</div>}>
      <Switch>
        {/* <Redirect exact from="/" to="/my-data" /> */}
        {menuConfig.map((menu) => (
          <Route key={menu.path} path={menu.path} component={menu.component} />
        ))}
        <Redirect exact from="/" to="/my-data" />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
