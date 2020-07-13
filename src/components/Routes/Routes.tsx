import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import menuConfig from '../../configs/menu';

const AppRouter: FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="data" />
      {menuConfig.map(menu => (
        <Route key={menu.path} exact path={menu.path} component={menu.component} />
      ))}
    </Switch>
  );
};

export default AppRouter;
