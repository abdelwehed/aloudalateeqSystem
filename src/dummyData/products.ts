export interface ProductsInterface {
  code: number;
  englishName: string;
  arabicName: string;
  displayName: string;
  /**
   * unit types and values
   * tola est 12ml/gramme
   *
   * oil; 3(rbo3 tola), 6(nos tola), 12(tola) (gramme) ==> afficher l'unité tola au lieu d'un chiffre DONE
      * relation avec la quantité: si on change d'unité remise à l'état initiale (quantité === 1) DONE
      * relation avec le weight: si on change d'unité remise à l'état initiale (weight === quantité x unité) avec la possiblité de changer le weight manuellement, les chiffre aprés la virgule n'impacteront pas le prix DONE
 
   * oud; min 12 et le max ouvert (gramme) -> on passe directement de 12 à 125(1/8 kg), 250(1/4 kg) ... 1000(1kg) gramme DONE
      * relation avec la quantité: si on change d'unité remise à l'état initiale (quantité === 1) DONE
      * relation avec la weight: si on change d'unité remise à l'état initiale (weight === quantité x unité) avec la possiblité de changer le weight manuellement, les chiffre aprés la virgule impacteront bien le prix
      * relation avec le prix: 12 (tola), 14,1 (prix de gramme x 14,1) 
        * 125(1/8 kg) (prix de gramme"prix de gros" x 126,7)
        * régle numéro1: si je change pas d'unité toujours (prix de gramme x weight)
  
   * le reste des unités c'est par pièce DONE
   */
  unit: any;
  price: number;
  unitPrice: number; // maybe delete !??
  quantity?: number;
  weight?: number;
  percent: number;
  special: number;
  category: string;
  unitType: string;
  supplier: string;
  supplierCode: string;
  stock: number;
}

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
    code: 1500,
    englishName: 'Musk Al Ghazal Al Aswad',
    arabicName: 'مسك الغزال الأسود',
    displayName: 'مسك الغزال الأسود',
    unit: 12,
    price: 1000,
    unitPrice: 1200,
    percent: 0,
    special: 0,
    category: 'مسك',
    unitType: 'kg',
    supplier: 'yazid',
    supplierCode: 'yzd',
    stock: 44,
  },
  {
    code: 2021,
    englishName: 'Al Reem',
    arabicName: 'الريم',
    displayName: 'زيت سونشيول',
    unit: 12,
    price: 60,
    unitPrice: 280,
    percent: 15,
    special: 0,
    category: 'مجموعة العود العتيق',
    unitType: 'kg',
    supplier: 'VIP',
    supplierCode: 'vip',
    stock: 56,
  },
  {
    code: 1900,
    englishName: 'Al-Khalida Blend',
    arabicName: 'الخلطة الخالدة',
    displayName: 'عبد الله بن خالد',
    unit: 12,
    price: 3500,
    unitPrice: 650,
    percent: 0,
    special: 0,
    category: 'خلطات',
    unitType: 'tola',
    supplier: 'yazid',
    supplierCode: 'yzd',
    stock: 35,
  },
  {
    code: 1920,
    englishName: 'Dehn Al-Oud kandal',
    arabicName: 'دهن عود كندال',
    displayName: 'دهن عود كمبودي 1',
    unit: 12,
    price: 1200,
    unitPrice: 650,
    percent: 0,
    special: 0,
    category: 'دهن العود',
    unitType: 'tola',
    supplier: 'yazid',
    supplierCode: 'yzd',
    stock: 112,
  },
  {
    code: 11002,
    englishName: 'cristal 100 ml with box',
    arabicName: 'كريستالة 100 مل مع صندوق',
    displayName: 'كريستالة 100 مل مع صندوق',
    unit: 1,
    price: 215,
    unitPrice: 215,
    weight: 100,
    percent: 0,
    special: 0,
    category: 'perfume',
    unitType: 'piece',
    supplier: 'Jiao Trading',
    supplierCode: 'JT',
    stock: 69,
  },
];
