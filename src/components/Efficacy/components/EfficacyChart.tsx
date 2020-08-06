import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts'
import { EfficacyData } from './EfficacyContainer';

interface Props {
  data: EfficacyData[];
}

const EfficacyChart: React.FC<Props> = ({ data }) => {
  const config = {
    title: {
      visible: true,
      text: '效能值统计图',
    },
    description: {
      visible: true,
      text: '选择左侧节点，统计其下一级所有节点的效能值。',
    },
    forceFit: true,
    height: 700,
    data,
    padding: 'auto',
    xField: 'label',
    yField: 'value',
    columnSize: 50,
    meta: {
      label: { alias: '节点名称' },
      value: { alias: '效能值' },
    },
    label: {
      visible: true,
      style: {
        fill: '#0D0E68',
        fontSize: 12,
        fontWeight: 600,
        opacity: 0.6,
      },
    },
    yAxis: {
      visible: true,
      min: 0,
      max: 100,
      tickCount: 10,
    }
  };
  return <Column {...config} />;
};

export default EfficacyChart;
