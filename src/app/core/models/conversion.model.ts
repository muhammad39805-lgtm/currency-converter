export interface Conversion {
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  date: Date;
  createdAt?: string;

}
