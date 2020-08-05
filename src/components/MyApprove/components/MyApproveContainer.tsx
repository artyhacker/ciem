import React, { useState, useEffect, FC, useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { Tabs } from "antd";
import MyApplicationSearch from "./MyApproveSearch";
import MyApproveTable from "./MyApproveTable";
import {
  MyApplicationType,
  ApplicationStatusTypeStr,
  MyApplicationSearchType,
  MyApplicationDescType,
  ApplicationStatusType,
} from "../../../models/dataApplication";
import * as actions from "../actions";
import MyApplicationDescModal from "./MyApproveDescModal";
import { fetchDownload } from "../../MyApplication/actions";

const MyApplicationContainer: FC = () => {
  const [list, setList] = useState<MyApplicationType[]>([]);
  const [showList, setShowList] = useState<MyApplicationType[]>([]);
  const [tabKey, setTabKey] = useState<ApplicationStatusTypeStr>("0");
  const [spinning, setSpinning] = useState(false);
  const [params, setParams] = useState<MyApplicationSearchType>({});

  const [descVisible, setDescVisible] = useState(false);
  const [descItem, setDescItem] = useState<MyApplicationDescType>();

  useEffect(() => {
    setSpinning(true);
    const cb = (resData: MyApplicationType[]) => {
      setSpinning(false);
      setList(resData);
      setShowList(resData.filter(rf => rf.status === 0));
    };
    actions.fetchList(cb);
    return () => {
      setSpinning(false);
      setList([]);
      setTabKey('0');
    };
  }, []);

  const onSearch = useCallback(
    (newParams: MyApplicationSearchType, newType?: ApplicationStatusTypeStr) => {
      const searchType = newType || tabKey;
      let prev = list.filter((lf) => lf.status.toString() === searchType);
      if (newParams.name) {
        prev = prev.filter(
          (pf) => pf.name.indexOf(newParams.name as string) > -1
        );
      }
      if (newParams.describe) {
        prev = prev.filter(
          (pf) => pf.describe.indexOf(newParams.describe as string) > -1
        );
      }
      if (newParams.dataUploader) {
        prev = prev.filter(
          (pf) => pf.dataUploader.indexOf(newParams.dataUploader as string) > -1
        );
      }
      if (newParams.applicant) {
        prev = prev.filter(
          (pf) => pf.applicant.indexOf(newParams.applicant as string) > -1
        );
      }
      setShowList(prev);
    },
    [list, tabKey]
  );

  const onReset = useCallback(
    () => {
      setParams({});
      onSearch({});
    },
    [onSearch],
  );

  const onTabChange = useCallback(
    (key: ApplicationStatusTypeStr) => {
      setTabKey(key);
      onSearch(params, key);
    },
    [params, onSearch],
  );

  const onDesc = useCallback((item: MyApplicationType) => {
    setSpinning(true);
    const cb = (resData: MyApplicationDescType) => {
      setDescItem(resData);
      setDescVisible(true);
      setSpinning(false);
    }
    actions.fetchItem(item, cb);
  }, []);

  const onCloseDesc = useCallback(() => {
    setDescItem(undefined);
    setDescVisible(false);
  }, []);

  const onApproveOrReject = useCallback((id: string, status: ApplicationStatusType, rejectText?: string) => {
    setList(prev => prev.map(pm => {
      if (pm.id === id) {
        return { ...pm, status, rejectText: rejectText || '' };
      }
      return pm;
    }));
    setShowList(prev => prev.map(pm => {
      if (pm.id === id) {
        return { ...pm, status, rejectText: rejectText || '' };
      }
      return pm;
    }));
    onCloseDesc();
  }, [onCloseDesc]);

  const onDownload = useCallback((r: MyApplicationType) => {
    fetchDownload(r);
  }, []);

  const c = useMemo(() => (
    <div className={styles.component}>
      <div>
        <MyApplicationSearch
          params={params}
          setParams={setParams}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>
      <div className={styles.table}>
        <MyApproveTable
          dataSource={showList}
          onDesc={onDesc}
          spinning={spinning}
          status={Number(tabKey) as ApplicationStatusType}
          onDownload={onDownload}
        />
      </div>
    </div>
  ), [showList, onSearch, onReset, spinning, params, onDesc, tabKey, onDownload]);

  return (
    <div className={styles.container}>
      <Tabs
        size="large"
        className={styles.tabs}
        activeKey={tabKey}
        onChange={(k) => onTabChange(k as ApplicationStatusTypeStr)}
        animated
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
      <MyApplicationDescModal visible={descVisible} item={descItem} onApproveOrReject={onApproveOrReject} onClose={onCloseDesc} />
    </div>
  );
};

export default MyApplicationContainer;
