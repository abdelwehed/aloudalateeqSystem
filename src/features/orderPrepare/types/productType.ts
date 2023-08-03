import { CategoryType } from './categoryType';
import { CollectionType } from './collectionType';
import { SupplierType } from './supplierType';
import { VariantTypes } from './variantType';

type ReductionType = {
  reductionPrice?: number;
  value?: number; // percentage
  beginDate?: number;
  endDate?: number;
  branchs?: Array<any>;
};

type ProductArrival = {
  // celui va avoir son propre interface de CRUD dans les verisons qui viennent
  id?: string;
  name: string;
  date: number;
  quantity: number;
  value: number;
  products: Array<ProductsInterface>;
};

type VariantsQuantitiesType = {
  quantity: number;
  value: number;
};

type StockType = {
  totalQuantity?: number;
  totalValue?: number;
  variantsQuantities?: Array<VariantsQuantitiesType> | null;
  arrival: string; // next change to ProductArrival;
  sells?: number;
};

export interface ProductsInterface {
  id?: string;
  name: string;
  imageCollection: Array<any>;
  image: string;
  imageUrl?: string;
  supplier?: SupplierType; // the id of the supplier
  supplierRef: string; // (réf fournisseur: le code du produit chez le fournisseur)
  internalRef?: string;
  collection?: CollectionType; // the id of the collection
  category: CategoryType; // the id of the category
  description?: string;
  note?: string;
  isFeatured?: boolean;
  isRecommended?: boolean;
  availableColors?: Array<string>; // add in VERSION 2
  variants?: VariantTypes; // unité / size / Weight par exemple comme ml, g, etc…
  buyPrice: number;
  sellPrice: number;
  reduction?: ReductionType;
  promo?: any; // impossible de créer une promo / solde au moment de la création d'un produit
  stock?: StockType;
  keywords?: Array<string>; // add in VERSION 2
  selectedColor?: string; // add in VERSION 2
  taxes?: Array<any>; // add in VERSION 2
  branchs?: Array<any>; // add in VERSION 2 : les shops
  dateAdded?: string;
}
