

export type TShippingCost = {
  _id: string;
  name: string;
  minSubTotal: number;
  maxSubTotal: number;
  cost: number;
  isActive: boolean;
  priority: number;
};

export type TShippingCostDataSource = {
  key: number;
  serial: number;
  _id: string;
  name: string;
  minSubTotal: number;
  maxSubTotal: number;
  cost: number;
  isActive: boolean;
  priority: number;
};
