import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';
import {
  SearchedOrderProduct,
  setSearchedProduct,
} from 'features/orderPrepare/orderReducer';
import { ProductsInterface } from '../types/productType';
import { RootState } from 'renderer/store';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const columns: readonly any[] = [
  {
    id: 'button',
    label: '',
  },
  {
    id: 'category',
    label: 'Category',
  },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'item', label: 'Item' },
  { id: 'code', label: 'Code' },
];

export default function SearchProductsComponent() {
  /*   const [rows, setRows] = useState<any[]>(
    products.map((product) => {
      return {
        ...product,
        quantity: 1,
      };
    })
  ); */
  const [rows, setRows] = useState<SearchedOrderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>('');
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const productsList = useAppSelector(
    (state: RootState) => state.search.products
  );

  function requestSearch(e: any) {
    const searchText = e.target.value.toLowerCase();

    setTimeout(() => {
      if (searchText === '') {
        setRows([]);
        return;
      }

      const filteredRows: Array<SearchedOrderProduct> = productsList
        .filter((row: ProductsInterface) => {
          const itemName = `${row.name}`;
          if (
            itemName.toLowerCase().includes(searchText) ||
            row.supplierRef.toString().toLowerCase().includes(searchText)
          ) {
            return true;
          }
          return false;
        })
        .map((product: ProductsInterface) => {
          console.log({ product });
          let variantSet = null;
          if (product.variants?.variants) {
            variantSet = product.variants?.variants[0].name;
          }

          return {
            ...product,
            productOrderQuantity: 1,
            productOrderValue: product.sellPrice,
            productOrderVariant: {
              variantGroupId: product.variants?.id,
              variantGroupName: product.variants?.name,
              variant: variantSet,
            },
          };
        });

      setRows(filteredRows);
    }, 1000);
  }

  function handleQuantityChange(event: any, rowItem: SearchedOrderProduct) {
    const rowWithQuantityUpdated = rows.map((row: SearchedOrderProduct) => {
      if (row.supplierRef === rowItem.supplierRef) {
        return {
          ...row,
          productOrderQuantity: parseInt(event.target.value),
        };
      }
      return row;
    });

    setRows(rowWithQuantityUpdated);
  }

  function handleOnSearchedItemClick(rowItem: SearchedOrderProduct) {
    dispatch(setSearchedProduct(rowItem));
  }

  function shouldDisplayResultOptions(): boolean {
    return rows.length > 0;
  }

  return (
    <>
      <Paper style={{ width: '44%' }}>
        <TextField
          id="outlined-basic"
          placeholder="Search"
          variant="outlined"
          onChange={requestSearch}
          style={{ width: '100%' }}
          InputProps={{
            endAdornment: loading ? (
              <CircularProgress color="secondary" />
            ) : null,
          }}
        />

        {shouldDisplayResultOptions() && (
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      colSpan={2}
                      style={{ backgroundColor: 'gray' }}
                      align="center"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row: SearchedOrderProduct) => (
                  <TableRow key={row.supplierRef}>
                    <TableCell colSpan={2} align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleOnSearchedItemClick(row)}
                      >
                        Add
                      </Button>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.category?.name}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.sellPrice}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <TextField
                        size="small"
                        style={{ width: 40 }}
                        id="outlined-number"
                        type="number"
                        value={row.productOrderQuantity}
                        onChange={(e) => handleQuantityChange(e, row)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.supplierRef}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
}
