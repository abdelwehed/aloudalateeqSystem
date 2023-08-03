import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

export function CouponPayment(props: any) {
  const [couponNumber, setCouponNumber] = useState<string | null>(null);
  const [couponValue, setCouponValue] = useState<string | null>(null);
  const [couponDate, setCouponDate] = useState<string | null>(null);
  const [paid, setPaid] = useState<number>(0);

  const couponData = {
    couponNumber,
    couponValue,
    couponDate,
    paid,
  };

  return (
    <Grid container justifyContent={'center'}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid xs={8} style={{ marginTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="CouponNumber"
            required
            fullWidth
            id="couponNumber"
            placeholder="Coupon Number"
            variant="outlined"
            label="Coupon Number"
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setCouponNumber(value);
              props.setCoupon({
                ...couponData,
                couponNumber: value,
              });
            }}
            value={couponNumber}
          />
        </Grid>

        <Grid xs={8} style={{ marginTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="CouponValue"
            required
            fullWidth
            id="couponValue"
            placeholder="Coupon Value"
            variant="outlined"
            label="Coupon Value"
            autoFocus
            onChange={(e) => {
              const value = e.target.value;
              setCouponValue(value);
              props.setCoupon({ ...couponData, couponValue: value });
            }}
            value={couponValue}
          />
        </Grid>

        <Grid xs={8} style={{ marginTop: 15 }}>
          <MobileDatePicker
            label="Expiration Date"
            inputFormat="MM/DD/YYYY"
            value={couponDate}
            onChange={(val) => {
              setCouponDate(val);
              props.setCoupon({ ...couponData, couponDate: val });
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: '100%' }} />
            )}
          />
        </Grid>

        <Grid item xs={8} style={{ paddingTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="Paid"
            required
            fullWidth
            id="paid"
            placeholder="Paid"
            variant="outlined"
            label="Paid"
            type="number"
            autoFocus
            onChange={(e) => {
              const integerValue = parseInt(e.target.value);
              setPaid(integerValue);
              props.setCoupon({ ...couponData, paid: integerValue });
            }}
            value={paid}
          />
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}
