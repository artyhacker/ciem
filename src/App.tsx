import React from 'react';
import styles from './App.module.css';
import Menu from './components/Menu';
import Routes from './components/Routes';
import Header from './components/Header/Header';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
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
