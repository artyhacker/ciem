import React, { FC, useCallback, useMemo } from "react";
import { Modal, Row, Col, Table, Checkbox, Divider } from "antd";
import ReactJson from "react-json-view";
// @ts-ignore
import XMLViewer from "react-xml-viewer";
import { DataMapType, DataType } from "../../../models/data";
import { MyApplicationDescType } from "../../../models/dataApplication";

interface Props {
  visible: boolean;
  item?: MyApplicationDescType;
  onClose: () => void;
}

type KeyMap = { [key: string]: boolean };

interface TableDataType extends DataMapType {
  isReq?: boolean;
  isRes?: boolean;
}

const XMLViewTheme = {
  attributeKeyColor: "#FF0000",
  attributeValueColor: "#000FF",
};

const MyApplicationDescModal: FC<Props> = ({ visible, item, onClose }) => {
  const columns = [
    { title: "CIEM数据元字典标识符", dataIndex: "dictId", width: "40%" },
    { title: "CIEM数据元字典中文名称", dataIndex: "dictName", width: "40%" },
    {
      title: "请求包",
      dataIndex: "requestFields",
      width: "10%",
      render: (v: string, r: TableDataType) => <Checkbox checked={!!r.isReq} />,
    },
    {
      title: "返回包",
      dataIndex: "responseFields",
      render: (v: string, r: TableDataType) => <Checkbox checked={!!r.isRes} />,
    },
  ];

  const dataSource: TableDataType[] = useMemo(() => {
    const result: TableDataType[] = [];
    if (item && item.requestFields) {
      result.push(...item.requestFields.map((rm) => ({ ...rm, isReq: true })));
    }
    if (item && item.responseFields) {
      item.responseFields.forEach((rf) => {
        const index = result.findIndex((rff) => rff.id === rf.id);
        if (index > -1) {
          result[index].isRes = true;
        } else {
          result.push({ ...rf, isRes: true });
        }
      });
    }
    return result;
  }, [item]);

  const getValue = useCallback(
    (key: keyof MyApplicationDescType, dataKey?: keyof DataType) => {
      if (!!item && item[key]) {
        if (key === "data" && dataKey) {
          return item[key][dataKey] || "";
        } else if (key !== "data") {
          return item[key] || "";
        }
      }
      return "";
    },
    [item]
  );

  const onCancel = () => {
    onClose();
  };

  const getFieldItem = (label: string, value: any) => (
    <span>{`${label}：${value}`}</span>
  );

  const getApiDataView = useCallback(() => {
    if (!item || item.status !== 1) {
      return null;
    }
    if (
      item &&
      item.apiType === "JSON" &&
      item.dataApi &&
      item.dataApi[0] === "{"
    ) {
      return (
        <>
          <Divider>API接口预览</Divider>
          <div style={{ maxHeight: "20rem", overflow: "auto" }}>
            <ReactJson src={JSON.parse(item.dataApi)} name={false} />
          </div>
        </>
      );
    }
    if (
      item &&
      item.apiType === "XML" &&
      item.dataApi &&
      item.dataApi[0] === "<"
    ) {
      return (
        <>
          <Divider>API接口预览</Divider>
          <div style={{ maxHeight: "20rem", overflow: "auto" }}>
            <XMLViewer
              xml={item.dataApi}
              theme={XMLViewTheme}
              indentSize={4}
              invalidXml="非法的XML文件"
            />
          </div>
        </>
      );
    }
    if (
      item &&
      item.apiType === "YML" &&
      item.dataApi
    ) {
      return (
        <>
          <Divider>API接口预览</Divider>
          <div style={{ maxHeight: "20rem", overflow: "auto" }}>
            {item.dataApi?.split('\n').map(s => (<p>{s}</p>))}
          </div>
        </>
      );
    }
    return null;
  }, [item]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
      title="数据申请详情"
      width={800}
    >
      <Row gutter={[16, 16]} style={{ padding: "0 1rem" }}>
        <Col span={12}>{getFieldItem("申请名称", getValue("name"))}</Col>
        <Col span={12}>{getFieldItem("申请描述", getValue("describe"))}</Col>
        <Col span={12}>{getFieldItem("申请方", getValue("applicant"))}</Col>
        <Col span={12}>
          {getFieldItem("提供方", getValue("data", "uploader"))}
        </Col>
        <Col span={12}>{getFieldItem("数据库表所在服务器IP", getValue("data", "ip"))}</Col>
        <Col span={12}>{getFieldItem("数据库表所在服务器端口", getValue("data", "port"))}</Col>
        <Col span={12}>{getFieldItem("协议类型", "HTTP")}</Col>
        <Col span={12}>{getFieldItem("请求方式", "POST")}</Col>
        <Col span={12}>{getFieldItem("接口形式", getValue("apiType"))}</Col>
        <Col
          span={12}
          style={{ display: item && item.status === -1 ? "" : "none" }}
        >
          {getFieldItem("驳回原因", getValue("rejectText"))}
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
        scroll={{ y: 260 }}
        bordered
      />
      {getApiDataView()}
    </Modal>
  );
};

export default MyApplicationDescModal;
