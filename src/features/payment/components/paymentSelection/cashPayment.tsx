import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { RootState } from 'renderer/store';
import { useAppSelector } from 'renderer/hooks';

export function CashPayment(props: any) {
  const [paid, setPaid] = useState<number>(0);

  const cashData = {
    paid,
    change: props.change,
  };

  return (
    <Grid
      container
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent="flex-start"
      style={{ width: props.width }}
    >
      <Grid container justifyContent={'center'}>
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
              const valueInteger = parseInt(e.target.value);
              setPaid(valueInteger);
              props.setCash({
                ...cashData,
                paid: valueInteger,
              });
            }}
            value={paid}
          />
        </Grid>

        <Grid item xs={8} style={{ paddingTop: 15 }}>
          <TextField
            autoComplete="given-name"
            name="Change"
            required
            fullWidth
            id="Change"
            placeholder="Change"
            variant="outlined"
            label="Change"
            autoFocus
            disabled
            value={props.change}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
