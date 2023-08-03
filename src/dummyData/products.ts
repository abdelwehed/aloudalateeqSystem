import { ProductsInterface } from 'features/orderPrepare/types/productType';

export const oudUniTypeValues = [
  {
    value: 12,
    label: '1 tola',
  },
  {
    value: 125,
    label: '1/8 kg',
  },
  {
    value: 250,
    label: '1/4 kg',
  },
  {
    value: 500,
    label: '1/2 kg',
  },
  {
    value: 1000,
    label: '1 kg',
  },
];

export const oilUniTypeValues = [
  {
    value: 3,
    label: '1/4 tola',
  },
  {
    value: 6,
    label: '1/2 tola',
  },
  {
    value: 12,
    label: '1 tola',
  },
];

export const products: Array<ProductsInterface> = [
  {
    id: '1500',
    name: 'Musk Al Ghazal Al Aswad',
    imageCollection: [],
    image: '',
    buyPrice: 100,
    sellPrice: 500,
    supplierRef: 'refSupp1',
    category: {
      id: 'cat_1',
      name: 'Misk',
      subCategories: [],
    },
    collection: {
      id: 'collec_1',
      name: 'collectionHiver',
    },
    variants: {
      id: 'variantGroup1',
      name: 'variantGroup_1',
      variants: [
        {
          name: 'variant_1',
          enabled: false,
        },
        {
          name: 'variant_2',
          enabled: true,
        },
        {
          name: 'variant_3',
          enabled: true,
        },
      ],
    },
    supplier: {
      id: 'supp_1',
      name: 'Supplier_1',
      mobileNumber: {
        dialCode: '33',
        countryCode: 'Fr',
        value: '33765656565',
      },
      email: 'supp1@yopmail.com',
    },
    stock: {
      totalQuantity: 100,
      totalValue: 50000,
      variantsQuantities: null,
      arrival: 'arrival_1',
      sells: 0,
    },
  },
  {
    id: '2021',
    name: 'Al Reem',
    imageCollection: [],
    image: '',
    buyPrice: 10,
    sellPrice: 60,
    supplierRef: 'refSupp2',
    category: {
      id: 'cat_2',
      name: 'Perfumes',
      subCategories: [
        {
          id: 'sub_cat_1',
          name: 'Firansi',
        },
        {
          id: 'sub_cat_2',
          name: 'Italy',
        },
      ],
    },
    supplier: {
      id: 'supp_2',
      name: 'Supplier_2',
      mobileNumber: {
        dialCode: '974',
        countryCode: 'Fr',
        value: '31132233',
      },
      email: 'supp2@yopmail.com',
    },
    stock: {
      totalQuantity: 10,
      totalValue: 600,
      variantsQuantities: null,
      arrival: 'arrival_2',
      sells: 0,
    },
  },
  {
    id: '1108',
    name: 'Doha of the world 100 ml',
    imageCollection: [],
    image: '',
    buyPrice: 50,
    sellPrice: 100,
    supplierRef: 'refSupp3',
    category: {
      id: 'cat_1',
      name: 'Misk',
      subCategories: [],
    },
    stock: {
      totalQuantity: 11,
      totalValue: 1100,
      variantsQuantities: [
        {
          quantity: 5,
          value: 500,
        },
        {
          quantity: 6,
          value: 600,
        },
      ],
      arrival: 'arrival_3',
      sells: 0,
    },
  },
];
