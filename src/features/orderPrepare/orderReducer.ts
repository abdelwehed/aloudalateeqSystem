import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsInterface } from './types/productType';

export interface SearchedOrderProduct extends ProductsInterface {
  productOrderQuantity: number;
  productOrderValue: number;
  productOrderVariant?: any;
  specialDiscount?: number; // discount done at caisse (in the shop)
  netToPay?: number;
}

export interface SearchProductsState {
  searchedProducts: Array<SearchedOrderProduct>;
}

const initialState: SearchProductsState = {
  searchedProducts: [],
};

const searchSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // set searched products
    setSearchedProduct(state, action: PayloadAction<SearchedOrderProduct>) {
      const productAlreadyAdded =
        state.searchedProducts.filter(
          (product) => product.supplierRef === action.payload.supplierRef
        ).length > 0;

      if (productAlreadyAdded) {
        const productsSearchedWithQuantityModified = state.searchedProducts.map(
          (pr) => {
            if (pr.supplierRef === action.payload.supplierRef) {
              const newQuantity =
                (pr.productOrderQuantity || 0) +
                (action.payload.productOrderQuantity || 0);
              return {
                ...pr,
                productOrderQuantity: newQuantity,
                productOrderValue: (pr.productOrderValue || 0) * newQuantity,
              };
            }
            return pr;
          }
        );
        state.searchedProducts = productsSearchedWithQuantityModified;
        return;
      }

      state.searchedProducts = [...state.searchedProducts, action.payload];
    },
    // increment productOrderQuantity
    incrementQuantity(state, action: PayloadAction<string>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload) {
          const quantityIncrementeByOne =
            (product?.productOrderQuantity || 0) + 1;
          return {
            ...product,
            productOrderQuantity: quantityIncrementeByOne,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // decrement productOrderQuantity
    decrementQuantity(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload) {
          const quantityDecrementeByOne =
            (product?.productOrderQuantity || 0) - 1;
          return {
            ...product,
            productOrderQuantity: quantityDecrementeByOne,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item productOrderQuantity
    changeSearchItemQuantity(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload.code) {
          return {
            ...product,
            productOrderQuantity: action.payload.quantity,
            productOrderValue:
              (product.sellPrice || 0) * action.payload.quantity,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item special promotion
    changeSearchItemSpecialPromotion(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload.code) {
          return {
            ...product,
            specialDiscount: action.payload.special,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item variant
    changeSearchItemVariant(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload.code) {
          return {
            ...product,
            productOrderQuantity: 1,
            productOrderVariant: {
              variantGroupId: action.payload.variantGroupId,
              variantGroupName: action.payload.variantGroupName,
              variant: action.payload.variant,
            },
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // select next item variant
    changeSearchItemNextVariant(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload.code) {
          const currentVariant = product?.productOrderVariant.variant;
          const currentVariantIndex = product?.variants?.variants?.findIndex(
            (el) => el.name === currentVariant
          );
          const nextVariant =
            // @ts-ignore
            currentVariantIndex + 1 === product?.variants?.variants.length
              ? currentVariant
              : // @ts-ignore
                product?.variants?.variants[currentVariantIndex + 1].name;

          return {
            ...product,
            productOrderQuantity: 1,
            productOrderVariant: {
              ...product.productOrderVariant,
              variant: nextVariant,
            },
          };
        }

        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // select previous item variant
    changeSearchItemPreviousVariant(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.supplierRef === action.payload.code) {
          const currentVariant = product?.productOrderVariant.variant;
          const currentVariantIndex = product?.variants?.variants?.findIndex(
            (el) => el.name === currentVariant
          );

          const previousVariant =
            currentVariantIndex === 0
              ? currentVariant
              : // @ts-ignore
                product?.variants?.variants[currentVariantIndex - 1].name;

          return {
            ...product,
            productOrderQuantity: 1,
            productOrderVariant: {
              ...product.productOrderVariant,
              variant: previousVariant,
            },
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // delete searched item
    removeSearchItem(state, action: PayloadAction<string>) {
      const newSearchedProducts = state.searchedProducts.filter(
        (product) => product.supplierRef !== action.payload
      );

      state.searchedProducts = newSearchedProducts;
    },
  },
});

export const {
  setSearchedProduct,
  incrementQuantity,
  decrementQuantity,
  changeSearchItemQuantity,
  changeSearchItemVariant,
  changeSearchItemNextVariant,
  changeSearchItemPreviousVariant,
  changeSearchItemSpecialPromotion,
  removeSearchItem,
} = searchSlice.actions;
export default searchSlice.reducer;
