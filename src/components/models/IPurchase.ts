export interface IPurchase {
  id: number;
  couponId: number;
  amount: number;
  totalPrice: number;
  timestamp: Date;
  title: string;
  description: string;
  endDate: Date;
  imageURL: string;
}

