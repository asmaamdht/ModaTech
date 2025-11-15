import { Product } from "./home";

export interface ICart extends Product {
    quantity: number;
    type: string;
}