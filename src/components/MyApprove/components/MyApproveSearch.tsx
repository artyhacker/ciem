import React, { FC, Dispatch, SetStateAction } from "react";
import { Row, Col, Input, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { MyApplicationSearchType } from "../../../models/dataApplication";

interface Props {
  params: MyApplicationSearchType;
  setParams: Dispatch<SetStateAction<MyApplicationSearchType>>;
  onSearch: (params: MyApplicationSearchType) => void;
  onReset: () => void;
}

const MyApplicationSearch: FC<Props> = ({ params, setParams, onSearch, onReset }) => {
  return (
    <Row gutter={[24, 16]}>
      <Col span={4}>
        <Input
          placeholder="申请名称"
          value={params.name}
          onChange={(e) => {
            e.persist();
            setParams((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </Col>
      <Col span={4}>
        <Input
          placeholder="申请描述"
          value={params.describe}
          onChange={(e) => {
            e.persist();
            setParams((prev) => ({ ...prev, describe: e.target.value }));
          }}
        />
      </Col>
      <Col span={4}>
        <Input
          placeholder="数据申请方"
          value={params.applicant}
          onChange={(e) => {
            e.persist();
            setParams((prev) => ({ ...prev, applicant: e.target.value }));
          }}
        />
      </Col>
      <Col span={4}>
        <Input
          placeholder="数据提供方"
          value={params.dataUploader}
          onChange={(e) => {
            e.persist();
            setParams((prev) => ({ ...prev, dataUploader: e.target.value }));
          }}
        />
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          style={{ marginRight: "24px" }}
          onClick={() => onSearch(params)}
          title="检索"
        >
          <SearchOutlined /> 检索
        </Button>
        <Button onClick={onReset} title="重置">
          <ReloadOutlined /> 重置
        </Button>
      </Col>
    </Row>
  );
};

export default MyApplicationSearch;
