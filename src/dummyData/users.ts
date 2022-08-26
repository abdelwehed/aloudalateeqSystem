export interface CustomerInterface {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  birthDate: string | null;
  additionalNote?: string | null;
  bills?: Array<any>;
}

export const users: Array<CustomerInterface> = [
  {
    firstName: 'Hamad',
    lastName: 'ben khalifa',
    phoneNumber: '00974 77777482',
    email: 'hamad.khalifa@yopmail.com',
    birthDate: '1997-08-12T00:00:00',
    additionalNote: 'special client',
    bills: [],
  },
  {
    firstName: 'naser',
    lastName: 'Mazroui',
    phoneNumber: '00974 55645454',
    email: 'nasermazroui@yopmail.com',
    birthDate: '1988-04-09T00:00:00',
    additionalNote: '',
    bills: [],
  },
  {
    firstName: 'Mohamed',
    lastName: 'Ben ali',
    phoneNumber: '00974 31131214',
    email: 'mohamed.benali@yopmail.com',
    birthDate: '2002-12-03T00:00:00',
    additionalNote: 'need extra bill',
    bills: [],
  },
  {
    firstName: 'ahlem',
    lastName: 'saiida',
    phoneNumber: '00974 31041289',
    birthDate: '1992-07-12T00:00:00',
    email: 'ahlem.saiida@yopmail.com',
    additionalNote: '',
    bills: [],
  },
];
