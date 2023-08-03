import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, TableHead, Typography } from '@mui/material';
import { billProductType } from 'features/payment/components/paymentBill/types/billType';

const columns: readonly any[] = [
  {
    id: 'displayName',
    label: 'DisplayName',
  },
  {
    id: 'variant',
    label: 'Variant',
  },
  { id: 'quantity', label: 'Quantity' },
  { id: 'price', label: 'Price' },
];

type billProductsPropsType = {
  billProducts: any;
};

export default function BillProductsDetails(props: billProductsPropsType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <Grid>
          <Typography
            variant="h5"
            sx={{
              padding: 1,
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }}
          >
            Products
          </Typography>
        </Grid>
        <TableContainer sx={{ maxHeight: 105 }}>
          <Table
            aria-labelledby="tableTitle"
            size={'small'}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {columns.map((column, id) => (
                  <TableCell
                    key={id}
                    colSpan={2}
                    sx={{
                      padding: 1,
                      bgcolor: (theme) =>
                        alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                      opacity: 0.7,
                    }}
                    align="center"
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.billProducts?.map(
                (row: billProductType, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell colSpan={2} align="center" id={labelId}>
                        <Typography variant="subtitle1">{row.name}</Typography>
                      </TableCell>

                      <TableCell colSpan={2} align="center" id={labelId}>
                        <Typography variant="subtitle1">
                          {row.variant ? row.variant.variant : 'no variant'}
                        </Typography>
                      </TableCell>

                      <TableCell colSpan={2} align="center" id={labelId}>
                        <Typography variant="subtitle1">
                          {row.quantity}
                        </Typography>
                      </TableCell>

                      <TableCell colSpan={2} align="center" id={labelId}>
                        <Typography variant="subtitle1">{`${row.sellPrice} QAR`}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
