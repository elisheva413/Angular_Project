export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  imgUrl: string;
  selectedQuantity: number; 
  color?: string;
  material?: string;
}