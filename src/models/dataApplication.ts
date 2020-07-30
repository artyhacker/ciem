export type DataApplicationType = {
  id?: string;
  name: string;
  describe: string;
  applicant: string;
  dataName: string;
  dataDescribe: string;
  dataUploader: string;
  rejectText: string;
  requestFields: string[];
  responseFields: string[];
  status: number;
  dataId: string;
};

export type DataApplicationSearchType = {
  name?: string;
  describe?: string;
  dataUploader?: string;
};
