import { Product } from "./home";

export interface ICart extends Product {
    quantity: number;
    type: string;
}

export type CartState = {
    cartItems: ICart[];
    totalQuantity: number;
    totalPrice: number;
    loading: boolean;
    error: string | null;
};