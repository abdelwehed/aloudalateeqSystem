export type PaymentMethod = {
  id?: string;
  name: string;
  // if name === card than type is visa, mc, etc...
  // if name === check than type is check différe ou autre
  type?: string | null;
};
