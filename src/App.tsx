import React from 'react';
import styles from './App.module.css';
import Menu from './components/Menu';
import Routes from './components/Routes';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        header
      </div>
      <div className={styles.body}>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.content}>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App;
