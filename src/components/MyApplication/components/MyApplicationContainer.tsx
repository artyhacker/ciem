import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.css";
import { Tabs } from "antd";
import MyApplicationSearch from "./MyApplicationSearch";
import MyApplicationTable from "./MyApplicationTable";
import {
  MyApplicationType,
  ApplicationStatusTypeStr,
} from "../../../models/dataApplication";
import * as actions from "../actions";

const MyApplicationContainer: FC = () => {
  const [list, setList] = useState<MyApplicationType[]>([]);
  const [tabKey, setTabKey] = useState<ApplicationStatusTypeStr>("0");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);
    const cb = (resData: MyApplicationType[]) => {
      setSpinning(false);
      setList(resData);
    };
    actions.fetchList(cb);
    return () => {
      setSpinning(false);
      setList([]);
    };
  }, []);

  const c = (
    <div className={styles.component}>
      <div>
        <MyApplicationSearch
          params={{}}
          setParams={() => {}}
          onSearch={() => {}}
          onReset={() => {}}
        />
      </div>
      <div className={styles.table}>
        <MyApplicationTable
          dataSource={list}
          onApply={() => {}}
          onDesc={() => {}}
          spinning={spinning}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Tabs
        size="large"
        className={styles.tabs}
        activeKey={tabKey}
        onChange={(k) => setTabKey(k as ApplicationStatusTypeStr)}
      >
        <Tabs.TabPane key="0" tab="待审批" className={styles["tab-pane"]}>
          {c}
        </Tabs.TabPane>
        <Tabs.TabPane key="-1" tab="已驳回" className={styles["tab-pane"]}>
          {c}
        </Tabs.TabPane>
        <Tabs.TabPane key="1" tab="已开通" className={styles["tab-pane"]}>
          {c}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyApplicationContainer;
