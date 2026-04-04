export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    slug?: string;
  };
  quantity: number;
  subtotal: number;
  selectedAttributes?: Array<{
    name: string;
    value: string;
  }> | null;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export interface AddToCartPayload {
  productId: number;
  quantity: number;
  selectedAttributes?: Array<{
    name: string;
    value: string;
  }> | null;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
