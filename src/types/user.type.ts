export type TBlockStatus = "blocked" | "unblocked";

export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: TBlockStatus;
};


export type IUserDataSource = {
  key: number;
  serial: number;
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: TBlockStatus;
}

