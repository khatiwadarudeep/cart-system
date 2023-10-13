interface CartItem {
    id: number; 
    quantity: number;
  }
  
  export interface ICart {
    userId: number;
    products: CartItem[];
  }