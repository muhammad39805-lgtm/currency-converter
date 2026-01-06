export interface Conversion {
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  date: Date;
  createdAt?: string;


}


 export interface Currency {
  code: string;
  name: string;
  symbol: string;
  type: string;
}
