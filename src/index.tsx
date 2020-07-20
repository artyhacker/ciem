import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route exact path="/login/:type?" component={Login} />
          <App />
        </Switch>
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
