import React, { FC, useState, useEffect } from "react";
import { Modal, Table } from "antd";
import { DictType, DictColumns } from "../../models/dict";

interface Props {
  visible: boolean;
  data: DictType[];
  onOk: () => void;
  onCancel: () => void;
}

const DictUploaderPreview: FC<Props> = ({ visible, data, onOk, onCancel }) => {
  const [prevData, setPrevData] = useState(data);

  useEffect(() => {
    setPrevData(data);
  }, [data]);

  return (
    <Modal
      visible={visible}
      title="数据预览"
      onOk={onOk}
      onCancel={onCancel}
      okText="确认导入"
      cancelText="取消导入"
    >
      <Table
        rowKey="id"
        columns={DictColumns}
        dataSource={prevData}
        bordered
        size="small"
        pagination={false}
        scroll={{ y: 450 }}
      />
    </Modal>
  );
};

export default DictUploaderPreview;
