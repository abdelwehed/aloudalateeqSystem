import { convertNumberPriceToAlphabet } from '../utils/billPriceConverter';

describe('convertNumberPriceToAlphabet method', () => {
  it('should return null if price passed is 0', () => {
    const result = convertNumberPriceToAlphabet(0);
    expect(result).toEqual(null);
  });

  it('should return null if price passed is négatif', () => {
    const result = convertNumberPriceToAlphabet(-5);
    expect(result).toEqual(null);
  });

  it('should return string equal to "One" if price passed is 1', () => {
    const result = convertNumberPriceToAlphabet(1);
    expect(result).toEqual('One');
  });

  it('should return string equal to "Ten" if price passed is 10', () => {
    const result = convertNumberPriceToAlphabet(10);
    expect(result).toEqual('Ten');
  });

  it('should return string equal to "Fifteen" if price passed is 15', () => {
    const result = convertNumberPriceToAlphabet(15);
    expect(result).toEqual('Fifteen');
  });

  it('should return string equal to "Seventeen" if price passed is 17', () => {
    const result = convertNumberPriceToAlphabet(17);
    expect(result).toBe('Seventeen');
  });

  it('should return string equal to "Nineteen" if price passed is 19', () => {
    const result = convertNumberPriceToAlphabet(19);
    expect(result).toBe('Nineteen');
  });

  it('should return string equal to "Twenty" if price passed is 20', () => {
    const result = convertNumberPriceToAlphabet(20);
    expect(result).toBe('Twenty');
  });

  it('should return string equal to "Fourty" if price passed is 40', () => {
    const result = convertNumberPriceToAlphabet(40);
    expect(result).toBe('Fourty');
  });

  it('should return string equal to "Eighty One" if price passed is 81', () => {
    const result = convertNumberPriceToAlphabet(81);
    expect(result).toBe('Eighty One');
  });

  it('should return string equal to "One hundred" if price passed is 100', () => {
    const result = convertNumberPriceToAlphabet(100);
    expect(result).toBe('One hundred');
  });

  it('should return string equal to "One hundred Two" if price passed is 102', () => {
    const result = convertNumberPriceToAlphabet(102);
    expect(result).toBe('One hundred Two');
  });

  it('should return string equal to "One hundred Ten" if price passed is 110', () => {
    const result = convertNumberPriceToAlphabet(110);
    expect(result).toBe('One hundred Ten');
  });

  it('should return string equal to "One hundred Eleven" if price passed is 111', () => {
    const result = convertNumberPriceToAlphabet(111);
    expect(result).toBe('One hundred Eleven');
  });

  it('should return string equal to "One hundred Fifteen" if price passed is 115', () => {
    const result = convertNumberPriceToAlphabet(115);
    expect(result).toBe('One hundred Fifteen');
  });

  it('should return string equal to "One hundred Fifteen" if price passed is 120', () => {
    const result = convertNumberPriceToAlphabet(120);
    expect(result).toBe('One hundred Twenty');
  });
});
