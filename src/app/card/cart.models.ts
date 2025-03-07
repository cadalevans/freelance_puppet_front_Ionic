export interface CartItem {
    id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    price: number;
  }
  
  export interface CartResponse {
    totalPrice: number;
    histories: CartItem[];
  }
  