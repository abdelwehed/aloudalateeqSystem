import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead, Typography } from '@mui/material';
import { useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';

interface SalesData {
  sales: string;
}

function createSalesData(sales: string): SalesData {
  return {
    sales,
  };
}

const salesData = [
  createSalesData('Tickets number'),
  createSalesData('Average Basket quantity'),
  createSalesData('Average Basket value'),
  createSalesData('Returns'), // the number of products returned
  createSalesData('Discount quantity'),
  createSalesData('Discount value'),
];

export default function SalesInfosTable() {
  const bills = useAppSelector((state: RootState) => state.search.bills); // filter by date, get only today's bills

  const rows = salesData;

  function getCellText(salesInfo: string): string {
    switch (salesInfo) {
      case 'Tickets number':
        return `${salesInfo}: ${bills?.length}`;
      case 'Average Basket quantity':
        let billsQuantity: number = 0;
        bills.map((el) => {
          el.products.map((product) => {
            billsQuantity += product.quantity;
          });
        });
        return `${salesInfo}: ${billsQuantity / bills.length}`;
      case 'Average Basket value':
        let billsVal: number = 0;
        bills.map((el) => {
          billsVal += el.totalNet;
        });
        return `${salesInfo}: ${billsVal / bills.length}`;
      case 'Returns':
        let productReturnsQuantity: number = 0;
        bills.map((el) => {
          el.products.map((product) => {
            if (product.quantity < 0) {
              productReturnsQuantity += product.quantity;
            }
          });
        });
        return `${salesInfo}: ${Math.abs(productReturnsQuantity)}`;
      case 'Discount quantity':
        let discountQuantity: number = 0;
        bills.map((el) => {
          el.products.map((product) => {
            const productPromo = product.promo || 0;
            const productReduction = product.reduction || 0;
            const productPrivateDiscount = product.privateDiscount || 0;

            if (productPromo || productReduction || productPrivateDiscount) {
              discountQuantity += 1;
            }
          });
        });
        return `${salesInfo}: ${discountQuantity}`;
      case 'Discount value':
        let discountVal: number = 0;
        bills.map((el) => {
          el.products.map((product) => {
            const productPromo = product.promo || 0;
            const productReduction = product.reduction || 0;
            const productPrivateDiscount = product.privateDiscount || 0;

            if (productPromo || productReduction) {
              discountVal += productPromo || productReduction;
            }

            if (productPrivateDiscount) {
              discountVal += productPrivateDiscount;
            }
          });
        });
        return `${salesInfo}: ${discountVal}`;
      default:
        return '';
    }
  }

  return (
    <Box sx={{ width: '35%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
                <Typography variant="h5">Sales Informations</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableContainer>
            <Table aria-labelledby="tableTitle" size={'medium'}>
              <TableBody>
                {rows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.sales}>
                      <TableCell
                        style={{ padding: 7 }}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <Typography variant="h6">
                          {getCellText(row.sales)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Table>
      </Paper>
    </Box>
  );
}
