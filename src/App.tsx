import React, { FC, CSSProperties } from 'react';
import styles from './App.module.css';
import Menu from './components/Menu';
import Routes from './components/Routes';
import Header from './components/Header/Header';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import pkg from '../package.json';

const versionStyle: CSSProperties = {
  position: 'absolute',
  bottom: '1rem',
  left: '70px',
  fontSize: '12px',
};

const App: FC<RouteComponentProps> = ({ history }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header history={history} />
      </div>
      <div className={styles.body}>
        <div className={styles.menu}>
          <Menu />
          <div style={versionStyle}>{`版本: V${pkg.version}`}</div>
        </div>
        <div className={styles.content}>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
