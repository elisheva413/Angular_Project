import { ProductModel } from './Products-Model';

export interface CartItem {
  product: ProductModel;
  selectedQuantity: number;
  included: boolean;
}

export interface SavedItem {
  product: ProductModel;
}