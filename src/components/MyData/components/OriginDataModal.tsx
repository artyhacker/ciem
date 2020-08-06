import React, { FC, useMemo } from "react";
import { Modal, Table } from "antd";
import { OriginDataType } from "./MyDataContainer";

interface Props {
  visible: boolean;
  data: OriginDataType[];
  onClose: () => void;
}

const OriginDataModal: FC<Props> = ({ visible, data, onClose }) => {
  const columns = useMemo(
    () =>
      data && data.length
        ? Object.keys(data[0]).map((key) => ({
            title: key,
            dataIndex: key,
          }))
        : [],
    [data]
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={null}
      title="已上传数据"
      width={1000}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        scroll={{ y: 500 }}
      />
    </Modal>
  );
};

export default OriginDataModal;
