export type DataApplicationType = {
  id?: string;
  name: string;
  describe: string;
  applicant: string;
  dataName: string;
  dataDescribe: string;
  dataUploader: string;
  rejectText: string;
};

export type DataApplicationSearchType = {
  name?: string;
  describe?: string;
  dataUploader?: string;
};
