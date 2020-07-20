export type UserType = {
  id?: string;
  username: string;
  name: string;
  area: number;
  areaLabel: string;
  password?: string;
  isAdmin?: 1 | 0;
};
