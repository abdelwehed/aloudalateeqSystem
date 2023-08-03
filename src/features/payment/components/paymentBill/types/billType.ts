import { PaymentMethod } from './paymentMethodType';

export type billPayment = {
  paymentMethod: PaymentMethod;
  value: number;
  change?: number; // when cash
  authorisationNumber?: string | null; // when card
  couponNumber?: string | null; // when coupon
  couponExpirationDate?: any; // when coupon
  couponValue?: number | null; // when coupon
  checkNumber?: string | null;
  checkBank?: string | null;
  checkDate?: any;
  checkHolder?: string | null;
};

export type billProductType = {
  idProduct?: string;
  name: string;
  sellPrice: number;
  variant?: any;
  quantity: number;
  promo?: number | null;
  reduction?: number | null;
  privateDiscount?: number;
};

export type BillType = {
  id?: string;
  dateAdded?: string;
  branch?: any;
  billNumber: string;
  products: Array<billProductType>;
  // exemple 1: { paymentMethod: { name: card, type?: visa }, value: 200}
  // exemple 2: { paymentMethod: { name: cash }, value: 850}
  payments: Array<billPayment>;
  customer?: any; // type Customer in V2
  staff: any; // type Staff in V2
  totalNet: number; // total price net to pay
};
