import React, { FC } from 'react';
import styles from './styles.module.css';
import DataTypeTree from './DataTypeTree';
import DataForm from './DataForm';

const DataRegisterContainer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DataTypeTree onSelect={(ks) => console.log(ks)} />
      </div>
      <DataForm />
    </div>
  );
};

export default DataRegisterContainer;
