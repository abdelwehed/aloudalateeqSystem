import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

export function CheckPayment(props: any) {
  const [checkNumber, setCheckNumber] = useState<string | null>(null);
  const [bank, setBank] = useState<string | null>(null);
  const [checkDate, setCheckDate] = useState<string | null>(null);
  const [checkHolder, setCheckHolder] = useState<string | null>(null);
  const [paid, setPaid] = useState<number>(0);

  const checkData = {
    checkNumber,
    bank,
    checkDate,
    checkHolder,
    paid,
  };

  return (
    <Grid container justifyContent={'center'}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid xs={8} style={{ marginTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="CheckNumber"
            required
            fullWidth
            id="checkNumber"
            placeholder="Check Number"
            variant="outlined"
            label="Check Number"
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setCheckNumber(value);
              props.setCheck({
                ...checkData,
                checkNumber: value,
              });
            }}
            value={checkNumber}
          />
        </Grid>

        <Grid xs={8} style={{ marginTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="bank"
            required
            fullWidth
            id="bank"
            placeholder="Bank"
            variant="outlined"
            label="Bank"
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setBank(value);
              props.setCheck({
                ...checkData,
                bank: value,
              });
            }}
            value={bank}
          />
        </Grid>

        <Grid xs={8} style={{ marginTop: 15 }}>
          <MobileDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={checkDate}
            onChange={(val) => {
              setCheckDate(val);
              props.setCheck({
                ...checkData,
                checkDate: val,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: '100%' }} />
            )}
          />
        </Grid>

        <Grid xs={8} style={{ marginTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="checkHolder"
            required
            fullWidth
            id="checkHolder"
            placeholder="Check Holder"
            variant="outlined"
            label="Check Holder"
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setCheckHolder(value);
              props.setCheck({
                ...checkData,
                checkHolder: value,
              });
            }}
            value={checkHolder}
          />
        </Grid>

        <Grid item xs={8} style={{ paddingTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="Paid"
            required
            fullWidth
            id="paid"
            type="number"
            placeholder="Paid"
            variant="outlined"
            label="Paid"
            autoFocus
            onChange={(e) => {
              const integerValue = parseInt(e.target.value);
              setPaid(integerValue);
              props.setCheck({
                ...checkData,
                paid: integerValue,
              });
            }}
            value={paid}
          />
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}
