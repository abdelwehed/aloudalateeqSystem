type SubCategoryType = {
  id?: string;
  name: string;
};

export type CategoryType = {
  id?: string;
  name: string;
  subCategories: Array<SubCategoryType>;
  dateAdded?: string;
};
