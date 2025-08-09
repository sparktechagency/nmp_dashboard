
export type TPaymentStatus = "paid" | "pending" | "failled";
export type TDeliveryStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type IOrder = {
  _id: string;
  token: string;
  fullName: string;
  email: string;
  phone: string;
  status: string; 
  paymentStatus: string; 
  totalPrice: number;
  createdAt: string; 
};



export type TOrderDataSource = {
  key: number;
  serial: number;
 _id: string;
  token: string;
  fullName: string;
  email: string;
  phone: string;
  status: string; 
  paymentStatus: string; 
  totalPrice: number;
  createdAt: string; 
}


export interface IShipping {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string
};


export type TOrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
  colorName?: string;
  colorHexCode?: string;
  size?: string;
};

export type ISingleOrder = {
  _id: string;
  token: string;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  deliveryAt: string | null;
  createdAt: string;
  shipping: IShipping;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: TOrderProduct[];
};
