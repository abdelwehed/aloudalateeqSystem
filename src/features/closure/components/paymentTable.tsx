import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, TableHead, Typography } from '@mui/material';
import { useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import { Fragment } from 'react';

export default function PaymentMethodsTable() {
  const bills = useAppSelector((state: RootState) => state.search.bills); // filter by date, get only today's bills

  function getPaymentMethodCellText() {
    let payments = {
      totalCardsValue: 0,
      numberOfCardsPayments: 0,
      totalCashValue: 0,
      numberOfCashPayments: 0,
      totalCheckValue: 0,
      numberOfCheckPayments: 0,
      totalCouponValue: 0,
      numberOfCouponPayment: 0,
    };

    bills.map((bill) => {
      bill.payments.map((payment) => {
        if (payment.paymentMethod.name === 'card') {
          payments = {
            ...payments,
            totalCardsValue: payments.totalCardsValue + payment.value,
            numberOfCardsPayments: payments.numberOfCardsPayments + 1,
          };
        }
        if (payment.paymentMethod.name === 'cash') {
          const cashChange = payment.change || 0;
          payments = {
            ...payments,
            totalCashValue:
              payments.totalCashValue + payment.value - cashChange,
            numberOfCashPayments: payments.numberOfCashPayments + 1,
          };
        }
        if (payment.paymentMethod.name === 'check') {
          payments = {
            ...payments,
            totalCheckValue: payments.totalCheckValue + payment.value,
            numberOfCheckPayments: payments.numberOfCheckPayments + 1,
          };
        }
        if (payment.paymentMethod.name === 'coupon') {
          payments = {
            ...payments,
            totalCouponValue: payments.totalCouponValue + payment.value,
            numberOfCouponPayment: payments.numberOfCouponPayment + 1,
          };
        }
      });
    });

    return payments;
  }

  const paymentMethodsUsed = getPaymentMethodCellText();
  const chiffreAffaireDay =
    paymentMethodsUsed.totalCardsValue +
    paymentMethodsUsed.totalCashValue +
    paymentMethodsUsed.totalCheckValue +
    paymentMethodsUsed.totalCouponValue;

  return (
    <Fragment>
      <Box sx={{ width: '35%' }}>
        <Paper
          sx={{
            height: '93%',
            width: '100%',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" color="gray">
            C.A of the day
          </Typography>
          <Typography variant="h4">{chiffreAffaireDay} QAR</Typography>
        </Paper>
      </Box>
      <Box sx={{ width: '25%' }}>
        <Paper sx={{ width: '100%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    padding: 1,
                    width: '100%',
                    bgcolor: (theme) =>
                      alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                      ),
                  }}
                >
                  <Typography variant="h5">Payment methods</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'medium'}>
                <TableBody>
                  {paymentMethodsUsed.numberOfCardsPayments > 0 && (
                    <TableRow hover tabIndex={-1}>
                      <TableCell
                        style={{ padding: 7 }}
                        component="th"
                        id={'cardsPayment'}
                        scope="row"
                      >
                        <Grid
                          container
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6">Cards:</Typography>
                          <Typography variant="h6">
                            {paymentMethodsUsed.totalCardsValue} (
                            {paymentMethodsUsed.numberOfCardsPayments})
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                  {paymentMethodsUsed.numberOfCashPayments > 0 && (
                    <TableRow hover tabIndex={-1}>
                      <TableCell
                        style={{ padding: 7 }}
                        component="th"
                        id={'cardsPayment'}
                        scope="row"
                      >
                        <Grid
                          container
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6">Cash:</Typography>
                          <Typography variant="h6">
                            {paymentMethodsUsed.totalCashValue} (
                            {paymentMethodsUsed.numberOfCashPayments})
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                  {paymentMethodsUsed.numberOfCheckPayments > 0 && (
                    <TableRow hover tabIndex={-1}>
                      <TableCell
                        style={{ padding: 7 }}
                        component="th"
                        id={'cardsPayment'}
                        scope="row"
                      >
                        <Grid
                          container
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6">Check:</Typography>
                          <Typography variant="h6">
                            {paymentMethodsUsed.totalCheckValue} (
                            {paymentMethodsUsed.numberOfCheckPayments})
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                  {paymentMethodsUsed.numberOfCouponPayment > 0 && (
                    <TableRow hover tabIndex={-1}>
                      <TableCell
                        style={{ padding: 7 }}
                        component="th"
                        id={'cardsPayment'}
                        scope="row"
                      >
                        <Grid
                          container
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6">Coupon:</Typography>
                          <Typography variant="h6">
                            {paymentMethodsUsed.totalCouponValue} (
                            {paymentMethodsUsed.numberOfCouponPayment})
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Table>
        </Paper>
      </Box>
    </Fragment>
  );
}
