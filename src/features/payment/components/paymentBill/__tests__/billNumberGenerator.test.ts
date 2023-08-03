import { generateBillNumber } from '../utils/billNumberGenerator';

describe('generateBillNumber method', () => {
  it('should return string equal to "2023-01-0001" if year is equal to 2023, month equal to 01 and last bill number is zéro', () => {
    const lastBillNumber = 0;
    const result = generateBillNumber(lastBillNumber);
    expect(result).toEqual('2023-01-0001');
  });

  it('should return string equal to "2023-01-0024" if year is equal to 2023, month equal to 01 and last bill number is zéro', () => {
    const lastBillNumber = 23;
    const result = generateBillNumber(lastBillNumber);
    expect(result).toEqual('2023-01-0024');
  });

  it('should return string equal to "2023-01-0988" if year is equal to 2023, month equal to 01 and last bill number is zéro', () => {
    const lastBillNumber = 987;
    const result = generateBillNumber(lastBillNumber);
    expect(result).toEqual('2023-01-0988');
  });

  it('should return string equal to "2023-01-4179" if year is equal to 2023, month equal to 01 and last bill number is zéro', () => {
    const lastBillNumber = 4178;
    const result = generateBillNumber(lastBillNumber);
    expect(result).toEqual('2023-01-4179');
  });
});
