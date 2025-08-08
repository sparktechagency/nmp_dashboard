
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
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  ratings: number;
  totalReview: number;
  images: string[];
  colors: {
    _id: string;
    name: string;
    hexCode: string;
  }[];
  sizes: {
    _id: string;
    size: string;
  }[];
  introduction: string;
  description: string;
  status: "visible" | "hidden";
  stockStatus: "in_stock" | "out_of_stock";
};
