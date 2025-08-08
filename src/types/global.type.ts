

export type IAuthUser = {
  id: string;
  iat: number;
  email: string;
  role: "admin" | "super_admin";
};

export interface IParam {
  name: string;
  value: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


export interface IApiError {
  error: {
    status: number;
    data: {
      message: string;
    }
  }
}
  