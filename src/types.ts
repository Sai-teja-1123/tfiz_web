export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Accessories' | 'Digital';
  image: string;
  description: string;
  isLimited?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: any;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
  };
}
