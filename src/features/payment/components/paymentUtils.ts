import { SearchedOrderProduct } from 'features/orderPrepare/orderReducer';
import { billPayment } from './paymentBill/types/billType';

export function getPaymenMethodsUsed(change: number, paymentInformations: any) {
  let paymentMethodsUsed: Array<billPayment> = [];

  // CASH
  const paidCash = paymentInformations?.cash?.paid || 0;
  if (paidCash !== 0) {
    const cashObject = {
      paymentMethod: {
        name: 'cash',
      },
      value: paidCash,
      change,
    };
    paymentMethodsUsed = [...paymentMethodsUsed, cashObject];
  }
  // CHECK
  const paidCheck = paymentInformations?.check?.paid || 0;
  if (paidCheck !== 0) {
    const checkObject = {
      paymentMethod: {
        name: 'check',
      },
      value: paidCheck,
      checkNumber: paymentInformations?.check?.checkNumber,
      checkBank: paymentInformations?.check?.bank,
      checkDate: paymentInformations?.check?.checkDate,
      checkHolder: paymentInformations?.check?.checkHolder,
    };
    paymentMethodsUsed = [...paymentMethodsUsed, checkObject];
  }
  // COUPON
  const paidCoupon = paymentInformations?.coupon?.paid || 0;
  if (paidCoupon !== 0) {
    const couponObject = {
      paymentMethod: {
        name: 'coupon',
      },
      value: paidCoupon,
      couponNumber: paymentInformations?.coupon?.couponNumber,
      couponExpirationDate: paymentInformations?.coupon?.couponDate,
      couponValue: paymentInformations?.coupon?.couponValue,
    };
    paymentMethodsUsed = [...paymentMethodsUsed, couponObject];
  }
  // CARDS
  let paidCards: number = 0;
  paymentInformations?.cards
    ?.filter((el: any) => el !== null)
    ?.map((element: any) => (paidCards += element?.paid || 0));
  if (paidCards !== 0) {
    paymentInformations?.cards.map((el: any) => {
      if (el) {
        const cardObject = {
          paymentMethod: {
            name: 'card',
            type: el.type,
          },
          value: el.paid,
          authorisationNumber: el.authoriationNumber,
        };
        paymentMethodsUsed = [...paymentMethodsUsed, cardObject];
      }
    });
  }
  // CREDIT (UN AVOIR)
  // ...
  // add this in VERSION 2
  // ...

  return paymentMethodsUsed;
}

export function getBillProducts(searchedProducts: Array<SearchedOrderProduct>) {
  const billProducts = searchedProducts.map((el: SearchedOrderProduct) => {
    return {
      idProduct: el.id,
      name: el.name,
      sellPrice: el.sellPrice,
      variant: el.productOrderVariant.variantGroupId
        ? el.productOrderVariant
        : null,
      quantity: el.productOrderQuantity,
      promo: el.promo.value || null,
      reduction: el.reduction?.value || null,
      privateDiscount: el.specialDiscount || null,
    };
  });

  return billProducts;
}
