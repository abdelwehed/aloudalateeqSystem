import moment from 'moment';
import { Moment } from 'moment';

export interface StaffInterface {
  id?: string;
  uid?: string;
  code?: string;
  civility?: string;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
  birthDate?: Moment | null;
  address?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  avatar?: string | null;
  fullname?: string;
  additionalNote?: string | null;
  bills?: Array<any>;
  relatedBranch?: string | null;
  role?: string;
  provider?: string;
  turnover?: any; //Chiffre d’affaire { daily, monthly, year }
}

export const staffs: Array<StaffInterface> = [
  {
    firstName: 'Chiheb',
    lastName: 'Batnini',
    mobileNumber: '0097477777482',
    email: 'chiheb.batnini@yopmail.com',
    birthDate: moment('1989-12-27T00:00:00'),
    additionalNote: 'big moudir',
    bills: [],
    relatedBranch: 'Tawar mall',
  },
  {
    firstName: 'Bachar',
    lastName: 'el souri',
    mobileNumber: '0097455645454',
    email: 'bachar.syria@yopmail.com',
    birthDate: moment('2003-04-09T00:00:00'),
    additionalNote: 'seller',
    bills: [],
    relatedBranch: 'Tawar mall',
  },
  {
    firstName: 'Abdallah',
    lastName: 'hamad',
    mobileNumber: '009745334454',
    email: 'abdallah.hamad@yopmail.com',
    birthDate: moment('1987-03-18T00:00:00'),
    additionalNote: 'seller',
    bills: [],
    relatedBranch: 'Tawar mall',
  },
];
