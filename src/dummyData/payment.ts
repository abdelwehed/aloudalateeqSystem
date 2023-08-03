import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const returnPaymentTypes: Array<any> = [
  {
    id: 1,
    label: 'CB',
    value: 'cb',
    icon: CreditCardIcon,
  },
  {
    id: 2,
    label: 'Espèces',
    value: 'cash',
    icon: AttachMoneyIcon,
  },
  // activate in VERSION 2
  /*   {
    id: 3,
    label: 'Avoir',
    value: 'credit',
    icon: ReceiptIcon,
  }, */
];

export const paymentTypes: Array<any> = [
  {
    id: 1,
    label: 'CB',
    value: 'cb',
    icon: CreditCardIcon,
  },
  {
    id: 2,
    label: 'Espèces',
    value: 'cash',
    icon: AttachMoneyIcon,
  },
  {
    id: 3,
    label: 'Chèque bancaire',
    value: 'bankCheck',
    icon: CommentBankIcon,
  },
  {
    id: 4,
    label: 'Coupon',
    value: 'coupon',
    icon: ConfirmationNumberIcon,
  },
  {
    id: 5,
    label: 'Multi-payment',
    value: 'multi',
    icon: ContentCopyIcon,
  },
];

export const cardTypes = [
  {
    id: 1,
    label: 'Visa',
    value: 'visa',
  },
  {
    id: 2,
    label: 'Master-card',
    value: 'mc',
  },
  {
    id: 3,
    label: 'Naps',
    value: 'naps',
  },
  {
    id: 4,
    label: 'Amex',
    value: 'amex',
  },
  {
    id: 5,
    label: 'Other',
    value: 'other',
  },
];
