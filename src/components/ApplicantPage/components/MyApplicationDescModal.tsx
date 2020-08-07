import React, { FC, useCallback, useMemo, useState, useEffect } from "react";
import { Modal, Divider, Form, Input, Row, Col, Button, Table } from "antd";
import ReactJson from "react-json-view";
// @ts-ignore
import XMLViewer from "react-xml-viewer";
import { DataMapType } from "../../../models/data";
import { MyApplicationDescType } from "../../../models/dataApplication";
import { fetchRequest } from "../actions";

interface Props {
  visible: boolean;
  item?: MyApplicationDescType;
  onClose: () => void;
}

const FormItem = Form.Item;

type KeyMap = { [key: string]: boolean };

interface TableDataType extends DataMapType {
  isReq?: boolean;
  isRes?: boolean;
}

const XMLViewTheme = {
  attributeKeyColor: "#FF0000",
  attributeValueColor: "#000FF",
};

type Params = { [key: string]: string };

type RequesterBody = {
  ip: string;
  port: string;
  method: string;
  protocol: string;
  tableName: string;
  requestField: { name: string; value: string; type?: string }[];
  responseField: { name: string; type?: string }[];
};

const defaultBody: RequesterBody = {
  ip: "",
  port: "",
  method: "",
  protocol: "",
  tableName: "",
  requestField: [],
  responseField: [],
};

const MyApplicationDescModal: FC<Props> = ({ visible, item, onClose }) => {
  const [params, setParams] = useState<Params>({});
  const [requestBody, setRequestBody] = useState<RequesterBody>(defaultBody);
  const [responseData, setResponseData] = useState<object[]>();

  useEffect(() => {
    if (item && visible) {
      const { ip, port, method, protocol, tableName } = item.data;
      setRequestBody({
        ip,
        port,
        method,
        protocol,
        tableName,
        requestField: [],
        responseField: item.responseFields.map((resField) => ({
          name: resField.id,
        })),
      });
    }
  }, [item, visible]);

  useEffect(() => {
    if (!visible) {
      setResponseData(undefined);
    }
  }, [visible]);

  const onCancel = () => {
    onClose();
  };

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
        <div style={{ maxHeight: "15rem", overflow: "auto" }}>
          <ReactJson src={JSON.parse(item.dataApi)} name={false} />
        </div>
      );
    }
    if (
      item &&
      item.apiType === "XML" &&
      item.dataApi &&
      item.dataApi[0] === "<"
    ) {
      return (
        <div style={{ maxHeight: "15rem", overflow: "auto" }}>
          <XMLViewer
            xml={item.dataApi}
            theme={XMLViewTheme}
            indentSize={4}
            invalidXml="非法的XML文件"
          />
        </div>
      );
    }
    if (item && item.apiType === "YML" && item.dataApi) {
      return (
        <div style={{ maxHeight: "15rem", overflow: "auto" }}>
          {item.dataApi?.split("\n").map((s) => (
            <p>{s}</p>
          ))}
        </div>
      );
    }
    return (
      <div style={{ maxHeight: "15rem", overflow: "auto" }}>
        {item.dataApi || ""}
      </div>
    );
  }, [item]);

  const requestform = useMemo(() => {
    if (item && item.requestFields) {
      return (
        <>
          {item.requestFields.map((field) => (
            <Col span={12} key={field.id}>
              <FormItem label={field.dictName} style={{ marginBottom: 0 }}>
                <Input
                  value={params[field.id]}
                  onChange={(e) => {
                    e.persist();
                    setParams((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              </FormItem>
            </Col>
          ))}
        </>
      );
    }
    return null;
  }, [item, params]);

  const onRequest = useCallback(() => {
    const requestField = Object.keys(params)
      .filter((key) => !!params[key])
      .map((key) => ({
        name: key,
        value: params[key],
      }));
    const body = { ...requestBody, requestField };
    fetchRequest(body, (d) => setResponseData(d));
  }, [params, requestBody]);

  const urlText = useMemo(() => {
    if (requestBody) {
      const { protocol, ip, port, method } = requestBody;
      return (
        <span style={{ marginRight: ".5rem" }}>
          <span
            style={{ fontWeight: "bold", marginRight: ".5rem" }}
          >{`${method}`}</span>
          {`${protocol.toLowerCase()}://${ip}:${port}`}
        </span>
      );
    }
    return null;
  }, [requestBody]);

  const responseView = useMemo(() => {
    console.log(responseData);
    if (responseData && responseData.length) {
      const columns = Object.keys(responseData[0]).map((k, index) => ({
        title: k,
        dataIndex: k,
        CISP_DATA_INDEX: index,
      }));
      return (
        <Table
          rowKey="CISP_DATA_INDEX"
          columns={columns}
          dataSource={responseData}
          pagination={false}
          scroll={{ y: 300 }}
          size="small"
          title={() => <span>返回数据</span>}
          bordered
        />
      );
    }
    return null;
  }, [responseData]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
      width={1000}
    >
      <Divider>API接口预览</Divider>
      {getApiDataView()}
      <Divider>API接口测试</Divider>
      <Form size="small">
        <Row gutter={[16, 8]}>
          {requestform}
          <Col span={12}>
            {urlText}
            <Button type={"primary"} onClick={onRequest}>
              发送
            </Button>
          </Col>
        </Row>
      </Form>
      {responseView}
    </Modal>
  );
};

export default MyApplicationDescModal;
