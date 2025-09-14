
export type TProductStatus = "visible" | "hidden";
export type TStockStatus = 'In Stock' | 'Limited Stock' | 'Out of Stock';

export type IProduct = {
  _id: string;
  name: string;
  type: string;
  category: string;
  brand: string;
  flavor: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
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
  type: string;
  category: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
  //discount: string;
  ratings: number;
  //totalReview: number;
  image: string;
  status: string,
  stockStatus: string;
}

export type TFeatureProductDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  type: string;
  category: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
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
  typeId: string;
  type: string;
  categoryId: string;
  brandId: string;
  flavorId: string;
  category: string;
  brand: string;
  flavor: string;
  currentPrice: number;
  originalPrice: number;
  quantity:number;
  isFeatured: boolean;
  discount: string;
  ratings: number;
  totalReview: number;
  image: string;
  description: string;
  status: string;
  stockStatus: string;
};
