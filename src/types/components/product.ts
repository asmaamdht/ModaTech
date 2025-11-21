import { Product } from "./home";

export type RootStackParamList = {
  ProductScreen: {
    product: Product;
  };
};

export interface IProduct {
  product: IProductDetails;
}

export interface IProductDetails {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}
