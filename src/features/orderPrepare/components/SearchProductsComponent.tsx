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
import { products, ProductsInterface } from 'dummyData/products';
import { useAppDispatch } from 'renderer/hooks';
import { setSearchedProduct } from 'features/orderPrepare/orderReducer';

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
    id: 'weight',
    label: 'Weight',
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
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>('');
  const classes = useStyles();
  const dispatch = useAppDispatch();

  function requestSearch(e: any) {
    const searchText = e.target.value.toLowerCase();

    setTimeout(() => {
      if (searchText === '') {
        setRows([]);
        return;
      }

      const filteredRows = products
        .filter((row) => {
          const itemName = `${row.englishName} - ${row.arabicName}`;
          if (
            itemName.toLowerCase().includes(searchText) ||
            row.code.toString().toLowerCase().includes(searchText)
          ) {
            return true;
          }
          return false;
        })
        .map((product) => {
          return {
            ...product,
            quantity: 1,
            weight: product.weight || product.unit,
          };
        });

      setRows(filteredRows);
    }, 1000);
  }

  function handleQuantityChange(event: any, rowItem: ProductsInterface) {
    const rowWithQuantityUpdated = rows.map((row) => {
      if (row.code === rowItem.code) {
        return {
          ...row,
          quantity: parseInt(event.target.value),
        };
      }
      return row;
    });

    setRows(rowWithQuantityUpdated);
  }

  function handleOnSearchedItemClick(rowItem: ProductsInterface) {
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
                {rows.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell colSpan={2} align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleOnSearchedItemClick(row)}
                      >
                        Add
                      </Button>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.weight}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.price}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <TextField
                        size="small"
                        style={{ width: 40 }}
                        id="outlined-number"
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleQuantityChange(e, row)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.englishName} - {row.arabicName}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.code}
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
