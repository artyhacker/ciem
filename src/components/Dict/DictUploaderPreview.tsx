import React, { FC, useState, useMemo } from "react";
import { Modal, Table, Checkbox } from "antd";
import { DictType, DictColumns } from "../../models/dict";

interface Props {
  visible: boolean;
  data: DictType[];
  onOk: (data: DictType[]) => void;
  onCancel: () => void;
}

const DictUploaderPreview: FC<Props> = ({ visible, data, onOk, onCancel }) => {
  const [delFirstLine, setDelFirstLine] = useState(true);
  const [swapCol, setSwapCol] = useState(false);

  const prevData = useMemo<DictType[]>(() => {
    let result = delFirstLine ? data.slice(1) : data;
    if (swapCol) {
      result = result.map(r => ({ id: r.name, name: r.id }));
    }
    return result;
  }, [data, delFirstLine, swapCol]);

  const title = (
    <div>
      <span>导入预览</span>
      <span style={{ marginRight: '2rem', marginLeft: '1rem', fontSize: '14px', fontWeight: 'normal' }}>{`(共${prevData.length}条)`}</span>
      <Checkbox checked={delFirstLine} onChange={(e) => setDelFirstLine(e.target.checked)}>去掉首行</Checkbox>
      <Checkbox checked={swapCol} onChange={(e) => setSwapCol(e.target.checked)}>交换标识符/名称</Checkbox>
    </div>
  );

  return (
    <Modal
      visible={visible}
      title={title}
      onOk={() => onOk(prevData)}
      onCancel={onCancel}
      okText="确认导入"
      cancelText="取消导入"
      width={600}
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
