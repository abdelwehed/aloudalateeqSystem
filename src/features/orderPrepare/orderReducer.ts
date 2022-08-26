import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  oilUniTypeValues,
  oudUniTypeValues,
  ProductsInterface,
} from '../../dummyData/products';

export interface SearchProductsState {
  searchedProducts: Array<ProductsInterface>;
}

const initialState: SearchProductsState = {
  searchedProducts: [],
};

const searchSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // set searched products
    setSearchedProduct(state, action: PayloadAction<ProductsInterface>) {
      const productAlreadyAdded =
        state.searchedProducts.filter(
          (product) => product.code === action.payload.code
        ).length > 0;

      if (productAlreadyAdded) {
        const productsSearchedWithQuantityModified = state.searchedProducts.map(
          (pr) => {
            if (pr.code === action.payload.code) {
              return {
                ...pr,
                quantity: (pr.quantity || 0) + (action.payload.quantity || 0),
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
    // increment quantity
    incrementQuantity(state, action: PayloadAction<number>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload) {
          const quantityIncrementeByOne = (product?.quantity || 0) + 1;
          const weight =
            product.unitType === 'piece'
              ? product.weight
              : quantityIncrementeByOne * product.unit;
          return {
            ...product,
            quantity: quantityIncrementeByOne,
            weight,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // decrement quantity
    decrementQuantity(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload) {
          const quantityDecrementeByOne = (product?.quantity || 0) - 1;
          const weight =
            product.unitType === 'piece'
              ? product.weight
              : quantityDecrementeByOne * product.unit;
          return {
            ...product,
            quantity: quantityDecrementeByOne,
            weight,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // increment unit
    incrementUnit(state, action: PayloadAction<any>) {
      if (action.payload.unitType === 'piece') {
        return;
      }
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          const unitTypeValues =
            action.payload.unitType === 'kg'
              ? oudUniTypeValues
              : oilUniTypeValues;
          const currentUnit = product?.unit;
          const currentUnitIndex = unitTypeValues.findIndex(
            (el) => el.value === currentUnit
          );
          const incrementedUnit =
            currentUnitIndex + 1 === unitTypeValues.length
              ? currentUnit
              : unitTypeValues[currentUnitIndex + 1].value;

          return {
            ...product,
            quantity: 1,
            unit: incrementedUnit,
            weight: incrementedUnit,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // decrement unit
    decrementUnit(state, action: PayloadAction<any>) {
      if (action.payload.unitType === 'piece') {
        return;
      }
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          const unitTypeValues =
            action.payload.unitType === 'kg'
              ? oudUniTypeValues
              : oilUniTypeValues;
          const currentUnit = product?.unit;
          const currentUnitIndex = unitTypeValues.findIndex(
            (el) => el.value === currentUnit
          );
          const incrementedUnit =
            currentUnitIndex === 0
              ? currentUnit
              : unitTypeValues[currentUnitIndex - 1].value;

          return {
            ...product,
            quantity: 1,
            unit: incrementedUnit,
            weight: incrementedUnit,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item quantity
    changeSearchItemQuantity(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          const weight =
            product.unitType === 'piece'
              ? product.weight
              : action.payload.quantity * product.unit;
          return {
            ...product,
            quantity: action.payload.quantity,
            weight,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item special promotion
    changeSearchItemSpecialPromotion(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          return {
            ...product,
            special: action.payload.special,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item unit value
    changeSearchItemUnit(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          return {
            ...product,
            unit: action.payload.unit,
            quantity: 1,
            weight: action.payload.unit,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // change searched item weight value
    changeSearchItemWeight(state, action: PayloadAction<any>) {
      const newSearchedProducts = state.searchedProducts.map((product) => {
        if (product.code === action.payload.code) {
          return {
            ...product,
            weight: action.payload.weight,
          };
        }
        return product;
      });

      state.searchedProducts = newSearchedProducts;
    },
    // delete searched item
    removeSearchItem(state, action: PayloadAction<number>) {
      const newSearchedProducts = state.searchedProducts.filter(
        (product) => product.code !== action.payload
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
  changeSearchItemSpecialPromotion,
  incrementUnit,
  decrementUnit,
  changeSearchItemUnit,
  changeSearchItemWeight,
  removeSearchItem,
} = searchSlice.actions;
export default searchSlice.reducer;
