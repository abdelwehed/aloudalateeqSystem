import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from 'renderer/store';
import { useAppSelector, useAppDispatch } from 'renderer/hooks';
import {
  Checkbox,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  changeSearchItemQuantity,
  changeSearchItemSpecialPromotion,
  changeSearchItemVariant,
  removeSearchItem,
  SearchedOrderProduct,
} from 'features/orderPrepare/orderReducer';
import { setTotalOrder } from 'features/payment/paymentReducer';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Column {
  id:
    | 'button'
    | 'netToPay'
    | 'special'
    // | 'percent'
    | 'quantity'
    | 'variants'
    | 'sellPrice'
    | 'item'
    | 'supplierRef'
    | 'select';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'button', label: '', align: 'right' },
  { id: 'netToPay', label: 'Net', align: 'right' },
  { id: 'special', label: 'Special', align: 'right' },
  /* {
    id: 'percent',
    label: '%',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  }, */
  {
    id: 'quantity',
    label: 'Quantity',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'variants',
    label: 'Variants',
    align: 'right',
  },
  { id: 'sellPrice', label: 'Price', align: 'right' },
  { id: 'item', label: 'Item', align: 'center' },
  { id: 'supplierRef', label: 'Code', align: 'right' },
  { id: 'select', label: 'Select', align: 'right' },
];

export default function SearchResultComponent(props: any) {
  const dispatch = useAppDispatch();

  const [selected, setSelected] = React.useState<string | null>(null);

  const [totalDisplayedPrice, setTotalDisplayedPrice] =
    React.useState<number>(0);

  const searchedProducts = useAppSelector(
    (state: RootState) => state.products.searchedProducts
  ).map((el: SearchedOrderProduct) => {
    const netQuantityDependant = (el.productOrderQuantity || 0) * el.sellPrice;

    // in VERSION 1: if we have promotion such as solde, it is priorit than single product disount
    // in VERSION 2: set the greater discount
    const discount = el.promo.value || el.reduction?.value || 0; // V1
    const specialDiscount = el.specialDiscount || 0;
    const promotion = discount + specialDiscount;
    const productNet =
      promotion !== 0
        ? (netQuantityDependant * (100 - promotion)) / 100
        : netQuantityDependant;

    return {
      ...el,
      netToPay: productNet,
    };
  });

  React.useEffect(() => {
    let total = 0;
    searchedProducts.map((el) => {
      total += el.netToPay;
    });

    setTotalDisplayedPrice(total);
    dispatch(setTotalOrder(total));
  }, [searchedProducts]);

  function handleQuantityChange(event: any, rowItem: SearchedOrderProduct) {
    const newQuantity = parseInt(event.target.value);
    const itemCode = rowItem.supplierRef;
    const changeQuantityPayload = {
      quantity: newQuantity,
      code: itemCode,
    };

    dispatch(changeSearchItemQuantity(changeQuantityPayload));
  }

  function handleElementDelete(rowItem: SearchedOrderProduct) {
    if (rowItem?.supplierRef === selected) {
      props.onItemSelect(null);
      setSelected(null);
    }
    dispatch(removeSearchItem(rowItem.supplierRef));
  }

  function handleSpecialPromotion(e: any, rowItem: SearchedOrderProduct) {
    const newSpecial = parseInt(e.target.value);
    const itemCode = rowItem.supplierRef;
    const changeSpecialPayload = {
      special: newSpecial,
      code: itemCode,
    };

    dispatch(changeSearchItemSpecialPromotion(changeSpecialPayload));
  }

  function handleVariantChange(e: any, rowItem: SearchedOrderProduct) {
    const variantParsed = e.target.value;
    const itemCode = rowItem.supplierRef;

    const changeVariantPayload = {
      variantGroupId: rowItem.variants?.id,
      variantGroupName: rowItem.variants?.name,
      variant: variantParsed,
      code: itemCode,
    };

    console.log({ changeVariantPayload });

    dispatch(changeSearchItemVariant(changeVariantPayload));
  }

  function handleClick(
    event: React.MouseEvent<unknown>,
    rowItem: SearchedOrderProduct
  ) {
    if (selected === null) {
      props.onItemSelect(rowItem);
      setSelected(rowItem?.supplierRef);
      return;
    }

    if (selected === rowItem?.supplierRef) {
      props.onItemSelect(null);
      setSelected(null);
      return;
    }

    if (selected !== rowItem?.supplierRef) {
      props.onItemSelect(rowItem);
      setSelected(rowItem?.supplierRef);
      return;
    }
  }

  const isSelected = (code: string) => selected === code;

  return (
    <Paper style={{ zIndex: 999, width: '100%' }}>
      <TableContainer sx={{ maxHeight: 460 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {searchedProducts?.map((row: SearchedOrderProduct) => {
              const isItemSelected = isSelected(row.supplierRef);

              return (
                <StyledTableRow
                  hover
                  tabIndex={-1}
                  key={row.supplierRef}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  {columns.map((column) => {
                    // @ts-ignore
                    const value = row[column.id];
                    console.log({ valuee: column.id });
                    if (column.id === 'quantity') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <TextField
                            size="small"
                            style={{ width: 35 }}
                            id="outlined-number"
                            type="number"
                            value={row.productOrderQuantity}
                            onChange={(e) => handleQuantityChange(e, row)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'special') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <TextField
                            size="small"
                            style={{ width: 42 }}
                            id="outlined-number"
                            type="number"
                            value={row.specialDiscount}
                            onChange={(e) => handleSpecialPromotion(e, row)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'button') {
                      return (
                        <StyledTableCell>
                          <IconButton
                            style={{ width: 20 }}
                            aria-label="delete"
                            onClick={() => handleElementDelete(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'select') {
                      return (
                        <StyledTableCell padding="checkbox" align="center">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row)}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': column.id,
                            }}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                          />
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'item') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <p style={{ width: 100 }}>{row.name}</p>
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'variants') {
                      // @ts-ignore
                      if (row.variants?.variants?.length > 0) {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //defaultValue={row.variants?.variants[0].name}
                                value={row.productOrderVariant.variant}
                                onChange={(e) => handleVariantChange(e, row)}
                              >
                                {row.variants?.variants?.map((el: any) => (
                                  <MenuItem value={el.name}>{el.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                        );
                      }

                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <p style={{ textAlign: 'center' }}>No variant</p>
                        </StyledTableCell>
                      );
                    }

                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {searchedProducts.length > 0 && <p>Total: {totalDisplayedPrice} QAR</p>}
    </Paper>
  );
}
