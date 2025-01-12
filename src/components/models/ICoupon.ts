export interface ICoupon {
  id: number;
  title: string;
  description: string;
  price: number;
  companyName: string;
  startDate: Date | string;
  endDate: Date | string;
  amount: number;
  imageURL?: string;
}
