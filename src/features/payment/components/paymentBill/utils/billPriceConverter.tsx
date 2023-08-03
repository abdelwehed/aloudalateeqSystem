function getTenthNumberInString(number: number): string {
  switch (number) {
    case 1:
      return 'Ten';
    case 2:
      return 'Twenty';
    case 3:
      return 'Thirty';
    case 4:
      return 'Fourty';
    case 5:
      return 'Fifty';
    case 6:
      return 'Sixty';
    case 7:
      return 'Seventy';
    case 8:
      return 'Eighty';
    case 9:
      return 'Ninety';
    default:
      return '';
  }
}

export function convertNumberPriceToAlphabet(price: number): string | null {
  const priceString = price.toString();

  if (price <= 0) {
    return null;
  }

  if (priceString.length === 1) {
    return numbersString[price - 1];
  }

  if (priceString.length === 2) {
    if (price === 11) {
      return 'Eleven';
    }
    if (price === 12) {
      return 'Twelve';
    }
    if (price === 13) {
      return 'Thirteen';
    }
    if (price === 15) {
      return 'Fifteen';
    }
    const unitNumber = parseInt(priceString[1]);
    const tensNumber = parseInt(priceString[0]);
    const numberToDisplay =
      unitNumber === 0 ? '' : numbersString[unitNumber - 1];

    if (tensNumber === 1 && unitNumber !== 0) {
      return `${numberToDisplay}teen`;
    }

    return `${getTenthNumberInString(tensNumber)} ${numberToDisplay}`.trimEnd();
  }

  if (priceString.length === 3) {
    if (price === 100) {
      return 'One hundred';
    }
    if (price === 111) {
      return 'One hundred Eleven';
    }
    if (price === 112) {
      return 'One hundred Twelve';
    }
    if (price === 115) {
      return 'One hundred Fifteen';
    }

    const unitNumber = parseInt(priceString[2]);
    const tensNumber = parseInt(priceString[1]);
    const hundredsNumber = parseInt(priceString[0]);
    const numberToDisplay =
      unitNumber === 0 ? '' : numbersString[unitNumber - 1];

    if (unitNumber === 0) {
      return `${
        numbersString[hundredsNumber - 1]
      } hundred ${getTenthNumberInString(tensNumber)}`.trimEnd();
    }

    if (tensNumber === 0) {
      return `${numbersString[hundredsNumber - 1]} hundred ${
        numbersString[unitNumber - 1]
      }`.trimEnd();
    }

    return `${
      numbersString[hundredsNumber - 1]
    } hundred ${numberToDisplay}teen`.trimEnd();
  }

  return null;
}

const numbersString = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  /*   'Ten',
  'Fourteen',
  'SixTeen',
  'Seventeen',
  'Eighteen',
  'Nineteen', */
];
