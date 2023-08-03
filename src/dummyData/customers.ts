import moment from 'moment';
import { Moment } from 'moment';

export interface CustomerInterface {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  birthDate: Moment | null;
  additionalNote?: string | null;
  bills?: Array<any>;
  adresse?: string;
}

export const customers: Array<CustomerInterface> = [
  {
    firstName: 'Hamad',
    lastName: 'ben khalifa',
    phoneNumber: '0097477777482',
    email: 'hamad.khalifa@yopmail.com',
    birthDate: moment('1997-08-12T00:00:00'),
    additionalNote: 'special client',
    bills: [],
  },
  {
    firstName: 'naser',
    lastName: 'Mazroui',
    phoneNumber: '0097455645454',
    email: 'nasermazroui@yopmail.com',
    birthDate: moment('1988-04-09T00:00:00'),
    additionalNote: '',
    bills: [],
  },
  {
    firstName: 'Mohamed',
    lastName: 'Ben ali',
    phoneNumber: '0097431131214',
    email: 'mohamed.benali@yopmail.com',
    birthDate: moment('2002-12-03T00:00:00'),
    additionalNote: 'need extra bill',
    bills: [],
  },
  {
    firstName: 'ahlem',
    lastName: 'saiida',
    phoneNumber: '0097431041289',
    birthDate: moment('1992-07-12T00:00:00'),
    email: 'ahlem.saiida@yopmail.com',
    additionalNote: '',
    bills: [],
  },
];
