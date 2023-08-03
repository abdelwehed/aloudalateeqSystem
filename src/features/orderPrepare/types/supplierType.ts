type SupplierCommercial = {
  name: string;
  mobileNumber?: string;
};

export type SupplierPhoneNumberType = {
  dialCode: string;
  countryCode: string;
  value: string;
  country?: string;
};

export type SupplierType = {
  id?: string;
  name: string;
  mobileNumber: SupplierPhoneNumberType;
  telNumber?: SupplierPhoneNumberType;
  email?: string;
  adress?: string;
  zipCode?: string;
  country?: string;
  region?: string;
  description?: string;
  commercials?: Array<SupplierCommercial>;
  dateAdded?: string;
};
