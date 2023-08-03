import { Grid, TextField } from '@mui/material';
import SelectInput from 'components/SelectInput';
import { cardTypes } from 'dummyData/payment';
import { useState } from 'react';
import {
  cardPaymentDataType,
  defaultCardPaymentData,
} from './paymentSelection';

export function CardPayment(props: any) {
  const [cardTypeSelected, setCardTypeSelected] = useState<string | null>(null);
  const [paid, setPaid] = useState<number>(0);
  const [authoriationNumber, setAuthoriationNumber] = useState<string | null>(
    null
  );
  const [otherType, setOtherType] = useState<string | null>(null);
  const [otherHolderName, setOtherHolderName] = useState<string | null>(null);
  const [otherNumber, setOtherNumber] = useState<string | null>(null);
  const [cardData, setCardData] = useState<cardPaymentDataType>(
    defaultCardPaymentData
  );

  function handleOnCardClick(value: any) {
    setCardTypeSelected(value);

    let paymentCardData: cardPaymentDataType = {
      ...cardData,
      type: value,
    };

    if (value === 'other') {
      paymentCardData = {
        ...cardData,
        type: value,
      };
    }

    setCardData(paymentCardData);
    props.setCard(paymentCardData);
  }

  function handleCardInputChange(e: any, inputType: string) {
    const value = e.target.value;

    switch (inputType) {
      case 'paid':
        const valueInteger = parseInt(value);
        setPaid(valueInteger);
        setCardData({ ...cardData, paid: valueInteger });
        props.setCard({ ...cardData, paid: valueInteger });
        break;
      case 'authorizationNumber':
        setAuthoriationNumber(value);
        setCardData({ ...cardData, authoriationNumber: value });
        props.setCard({ ...cardData, authoriationNumber: value });
        break;
      case 'otherCardType':
        setOtherType(value);
        setCardData({ ...cardData, type: value });
        props.setCard({ ...cardData, type: value });
        break;
      case 'holderName':
        setOtherHolderName(value);
        setCardData({ ...cardData, holderName: value });
        props.setCard({ ...cardData, holderName: value });
        break;
      case 'number':
        setOtherNumber(value);
        setCardData({ ...cardData, number: value });
        props.setCard({ ...cardData, number: value });
        break;
      default:
        console.log('other does not exist');
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid xs={8} style={{ paddingTop: 15 }}>
        <SelectInput
          data={cardTypes}
          inputLabel={'card type'}
          onSelect={handleOnCardClick}
        />
      </Grid>

      <Grid xs={8} style={{ paddingTop: 15 }}>
        <TextField
          autoComplete="given-name"
          name="AuthorizationNumber"
          required
          fullWidth
          id="authorizationNumber"
          placeholder="Authorization Number"
          variant="outlined"
          label="Authorization Number"
          autoFocus
          onChange={(e) => handleCardInputChange(e, 'authorizationNumber')}
          value={authoriationNumber}
        />
      </Grid>

      <Grid xs={8} style={{ paddingTop: 15 }}>
        <TextField
          autoComplete="given-name"
          name="Paid"
          type="number"
          required
          fullWidth
          id="Paid"
          placeholder="Paid"
          label="Paid"
          variant="outlined"
          autoFocus
          onChange={(e) => handleCardInputChange(e, 'paid')}
          value={paid}
        />
      </Grid>

      {cardTypeSelected === 'other' && (
        <Grid container xs={8} flexDirection={'column'}>
          <Grid style={{ paddingTop: 15 }}>
            <TextField
              autoComplete="given-name"
              name="Type"
              required
              fullWidth
              id="otherInfos"
              placeholder="Type"
              label="Type"
              variant="outlined"
              autoFocus
              onChange={(e) => handleCardInputChange(e, 'otherCardType')}
              value={otherType}
            />
          </Grid>

          <Grid style={{ paddingTop: 15 }}>
            <TextField
              autoComplete="given-name"
              name="HolderName"
              required
              fullWidth
              id="holderName"
              placeholder="Holder Name"
              label="Holder Name"
              variant="outlined"
              autoFocus
              onChange={(e) => handleCardInputChange(e, 'holderName')}
              value={otherHolderName}
            />
          </Grid>

          <Grid style={{ paddingTop: 15 }}>
            <TextField
              autoComplete="given-name"
              name="Number"
              required
              fullWidth
              id="number"
              placeholder="Number"
              label="Number"
              variant="outlined"
              autoFocus
              onChange={(e) => handleCardInputChange(e, 'number')}
              value={otherNumber}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
