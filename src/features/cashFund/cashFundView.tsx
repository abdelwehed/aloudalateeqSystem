import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

const todayFormatted = moment().format('LLL');

export function CashFundView() {
  const [cashEntred, setCashEntred] = useState<number | null>(null);
  const [displayCashSpent, setDisplayCashSpent] = useState<boolean>(false);
  const [displayCashBring, setDisplayCashBring] = useState<boolean>(false);

  return (
    <>
      <Grid container flexDirection="column" style={{ flex: 1 }}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Cash fund
        </Typography>

        <Grid
          container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">{todayFormatted}</Typography>
          <Grid item display="flex" flexDirection="row" alignItems="center">
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Shift closed
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        style={{ marginTop: 10, minWidth: 500 }}
      >
        <Grid style={{ width: '50%' }}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ backgroundColor: '#0b304a', padding: 10, borderRadius: 5 }}
          >
            <Typography id="modal-modal-description" variant="h6" color="#fff">
              Previous fund. "text dynamique selon l'action"
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              id="outlined-required"
              onChange={(e) => setCashEntred(parseInt(e.target.value))}
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ padding: 10 }}
          >
            <Typography id="modal-modal-description" variant="h6">
              Cash received from sales
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              required
              disabled
              id="outlined-required"
              value="0"
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ padding: 10 }}
          >
            <Typography id="modal-modal-description" variant="h6">
              Cash fees
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              required
              disabled
              id="outlined-required"
              value="0"
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ padding: 10 }}
          >
            <Typography id="modal-modal-description" variant="h6">
              Cash fund (Theoric)
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              required
              disabled
              id="outlined-required"
              value="0"
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ padding: 10 }}
          >
            <Typography id="modal-modal-description" variant="h6">
              Gap
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              required
              disabled
              id="outlined-required"
              value="0"
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{ backgroundColor: '#0b304a', padding: 10, borderRadius: 5 }}
          >
            <Typography id="modal-modal-description" variant="h6" color="#fff">
              Cash fund (Real)
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              id="outlined-required"
              onChange={(e) => setCashEntred(parseInt(e.target.value))}
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            style={{
              backgroundColor: '#0b304a',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Typography id="modal-modal-description" variant="h6" color="#fff">
              Bank deposit
            </Typography>
            <TextField
              type="number"
              className="auth-input"
              id="outlined-required"
              onChange={(e) => setCashEntred(parseInt(e.target.value))}
              sx={{
                width: '100%',
                input: {
                  color: '#818181',
                  fontSize: '10px',
                  border: '2px solid #9a692b',
                  borderRadius: '5px',
                  height: '3px',
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          flexDirection="column"
          alignItems="flex-start"
          style={{
            width: '45%',
            backgroundColor: '#e7bd67',
            padding: '10px 10px 10px 10px',
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold', marginLeft: 10 }}
          >
            Cash Fees
          </Typography>

          <Grid
            container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginTop: 25 }}
          >
            <Button
              onClick={() => {
                setDisplayCashSpent(!displayCashSpent);
                setDisplayCashBring(false);
              }}
              color="secondary"
              variant="contained"
            >
              <Typography variant="h5" sx={{ color: '#fff' }}>
                + Spent
              </Typography>
            </Button>

            <Button
              onClick={() => {
                setDisplayCashBring(!displayCashBring);
                setDisplayCashSpent(false);
              }}
              color="secondary"
              variant="contained"
            >
              <Typography variant="h5" sx={{ color: '#fff' }}>
                + apport
              </Typography>
            </Button>
          </Grid>

          {(displayCashSpent || displayCashBring) && (
            <>
              <TextField
                type="text"
                className="auth-input"
                id="outlined-required"
                onChange={(e) => setCashEntred(parseInt(e.target.value))}
                placeholder={displayCashSpent ? 'Spent title' : 'Bring title'}
                sx={{
                  width: '100%',
                  marginTop: 1,
                  input: {
                    color: '#fff',
                    fontSize: '14px',
                    border: '2px solid #9a692b',
                    borderRadius: '5px',
                    height: '3px',
                  },
                }}
              />

              <TextField
                type="number"
                className="auth-input"
                id="outlined-required"
                onChange={(e) => setCashEntred(parseInt(e.target.value))}
                placeholder={displayCashSpent ? 'Spent value' : 'Bring value'}
                sx={{
                  width: '100%',
                  marginTop: 1,
                  input: {
                    color: '#fff',
                    fontSize: '14px',
                    border: '2px solid #9a692b',
                    borderRadius: '5px',
                    height: '3px',
                  },
                }}
              />

              <Button
                onClick={() => {}}
                color="secondary"
                variant="contained"
                sx={{ marginTop: 1, width: '100%' }}
              >
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  confirmer
                </Typography>
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
