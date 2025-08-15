export type TBlockStatus = "blocked" | "unblocked";

export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profile_img: string;
  status: string;
};


export type TProfile = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profile_img: string;
}

export type IUserDataSource = {
  key: number;
  serial: number;
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profile_img: string;
  status: string;
}

