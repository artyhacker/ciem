import { DataMapType, DataType } from "./data";

export type DataApplicationType = {
  id?: string;
  name: string;
  describe: string;
  applicant: string;
  dataName: string;
  dataDescribe: string;
  dataUploader: string;
  rejectText: string;
  requestFields: DataMapType[];
  responseFields: DataMapType[];
  status: ApplicationStatusType;
  dataId: string;
};

export type DataApplicationSearchType = {
  name?: string;
  describe?: string;
  dataUploader?: string;
};

export type ApplicationStatusType = -1 | 0 | 1;
export type ApplicationStatusTypeStr = '-1' | '0' | '1';

export type MyApplicationType = {
  id: string;
  name: string;
  describe: string;
  applicant: string;
  dataName: string;
  dataDescribe: string;
  dataUploader: string;
  rejectText: string;
  status: ApplicationStatusType;
}

export type MyApplicationSearchType = {
  name?: string;
  describe?: string;
  dataUploader?: string;
  applicant?: string;
}

export type MyApplicationDescType = {
  id: string;
  name: string;
  describe: string;
  ip: string;
  port: string;
  apiType: string;
  status: ApplicationStatusType;
  applicant: string;
  rejectText?: string;
  data: DataType;
  requestFields: DataMapType[];
  responseFields: DataMapType[];
  dataApi?: string;
}
