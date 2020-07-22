import React, { FC } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const MyDataSearch: FC = () => {
  return (
    <Row gutter={[ 24, 16 ]}>
      <Col span={4}>
        <Input placeholder="数据名称" />
      </Col>
      <Col span={4}>
        <Input placeholder="数据描述" />
      </Col>
      <Col span={4}>
        <Button type="primary" style={{ marginRight: '24px' }}>
          <SearchOutlined /> 检索
        </Button>
        <Button>
          <ReloadOutlined /> 重置
        </Button>
      </Col>
    </Row>
  )
};

export default MyDataSearch;
