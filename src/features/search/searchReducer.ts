import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from 'features/orderPrepare/types/categoryType';
import { CollectionType } from 'features/orderPrepare/types/collectionType';
import { ProductsInterface } from 'features/orderPrepare/types/productType';
import { SupplierType } from 'features/orderPrepare/types/supplierType';
import { VariantTypes } from 'features/orderPrepare/types/variantType';
import { BillType } from 'features/payment/components/paymentBill/types/billType';

export type ProductsListType = {
  products: Array<ProductsInterface>;
  lastKey?: any;
  total?: number;
};

export type CategoriesListType = {
  categories: Array<CategoryType>;
  lastKey?: any;
  total?: number;
};

export type CollectionsListType = {
  collections: Array<CollectionType>;
  lastKey?: any;
  total?: number;
};

export type SuppliersListType = {
  suppliers: Array<SupplierType>;
  lastKey?: any;
  total?: number;
};

export type VariantsListType = {
  variants: VariantTypes;
  lastKey?: any;
  total?: number;
};

export type BillsListType = {
  bills: Array<BillType>;
  lastKey?: any;
  total?: number;
};

export interface SearchState {
  products: Array<ProductsInterface>;
  categories: Array<CategoryType>;
  collections: Array<CollectionType>;
  suppliers: Array<SupplierType>;
  bills: Array<BillType>;
  variants: VariantTypes | null;
}

const initialState: SearchState = {
  products: [],
  categories: [],
  collections: [],
  suppliers: [],
  bills: [],
  variants: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // set products data after api call success
    setProducts(state, action: PayloadAction<ProductsListType>) {
      state.products = action.payload.products;
    },
    // set categories data after api call success
    setCategories(state, action: PayloadAction<CategoriesListType>) {
      state.categories = action.payload.categories;
    },
    // set collections data after api call success
    setCollections(state, action: PayloadAction<CollectionsListType>) {
      state.collections = action.payload.collections;
    },
    // set suppliers data after api call success
    setSuppliers(state, action: PayloadAction<SuppliersListType>) {
      state.suppliers = action.payload.suppliers;
    },
    // set variants data after api call success
    setVariants(state, action: PayloadAction<VariantsListType>) {
      state.variants = action.payload.variants;
    },
    // set bills data after api call success
    setBills(state, action: PayloadAction<BillsListType>) {
      try {
        state.bills = action.payload.bills;
      } catch (e) {
        console.log('Error in setBills reducer', { e });
      }
      //state.bills = action.payload.bills;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setCollections,
  setSuppliers,
  setVariants,
  setBills,
} = searchSlice.actions;
export default searchSlice.reducer;
