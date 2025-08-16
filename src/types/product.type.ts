
export type TProductStatus = "visible" | "hidden";
export type TStockStatus = 'in_stock' | 'stock_out' | 'up_coming';

export type IProduct = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  flavor: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  ratings: number;
  totalReview: number;
  image: string;
  status: string;
  stockStatus: string;
};


export type TProductDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  category: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  //discount: string;
  ratings: number;
  //totalReview: number;
  image: string;
  status: string,
  stockStatus: string;
}

export type ISingleProduct = {
  _id: string;
  name: string;
  categoryId: string;
  brandId: string;
  flavorId: string;
  category: string;
  brand: string;
  flavor: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  ratings: number;
  totalReview: number;
  image: string;
  description: string;
  status: string;
  stockStatus: string;
};
