import React from 'react';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        header
      </div>
      <div className={styles.body}>
        <div className={styles.menu}>
          menu
        </div>
        <div className={styles.content}>
          content
        </div>
      </div>
    </div>
  );
}

export default App;
