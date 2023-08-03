import moment from 'moment';

// est ce qu'il y a un format défini par l'état pour les numéros de factures ??
function convertBillNumber(billNumber: number): string {
  const billNumberStringify = billNumber.toString();

  if (billNumberStringify.length === 1) {
    return `000${billNumber}`;
  }

  if (billNumberStringify.length === 2) {
    return `00${billNumber}`;
  }

  if (billNumberStringify.length === 3) {
    return `0${billNumber}`;
  }

  return billNumberStringify;
}

export function generateBillNumber(lastBillNumber: number): string {
  const todayFormatted = moment().format('YYYY-MM');
  const nextBillNumber = `${todayFormatted}-${convertBillNumber(
    lastBillNumber + 1
  )}`;
  return nextBillNumber || '';
}
