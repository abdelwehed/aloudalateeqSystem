import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, TableHead, Typography } from '@mui/material';
import { billPayment } from 'features/payment/components/paymentBill/types/billType';

type billPaymentType = {
  billPayments: any;
};

export default function BillPaymentDetails(props: billPaymentType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    padding: 1,
                    bgcolor: (theme) =>
                      alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                      ),
                  }}
                >
                  <Typography variant="h5">Payments</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.billPayments?.map((el: billPayment, index: number) => {
                const change =
                  el.paymentMethod.name === 'cash'
                    ? ` - change: ${el.change}`
                    : null;
                return (
                  <TableRow key={el.paymentMethod.name}>
                    <TableCell
                      style={{ padding: 7 }}
                      component="th"
                      id={`${index}`}
                      scope="row"
                    >
                      <Typography variant="h6">
                        {el.paymentMethod.name}: {el.value}
                        {change}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
