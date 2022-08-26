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
  changeSearchItemUnit,
  changeSearchItemWeight,
  removeSearchItem,
} from 'features/orderPrepare/orderReducer';
import {
  oilUniTypeValues,
  oudUniTypeValues,
  ProductsInterface,
} from 'dummyData/products';

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
    | 'net'
    | 'special'
    | 'percent'
    | 'weight'
    | 'quantity'
    | 'price'
    | 'unit'
    | 'item'
    | 'code'
    | 'select';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'button', label: '', align: 'right' },
  { id: 'net', label: 'Net', align: 'right' },
  { id: 'special', label: 'Special', align: 'right' },
  {
    id: 'percent',
    label: '%',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'weight',
    label: 'Weight',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  { id: 'price', label: 'Price', align: 'right' },
  { id: 'unit', label: 'Unit', align: 'right' },
  { id: 'item', label: 'Item', align: 'center' },
  { id: 'code', label: 'Code', align: 'right' },
  { id: 'select', label: 'Select', align: 'right' },
];

export default function SearchResultComponent(props: any) {
  const dispatch = useAppDispatch();

  const [rows, setRows] = React.useState<Array<any>>([]);
  const [selected, setSelected] = React.useState<number | null>(null);

  const [totalDisplayedPrice, setTotalDisplayedPrice] =
    React.useState<number>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rows?.length);

  const searchedProducts = useAppSelector(
    (state: RootState) => state.products.searchedProducts
  ).map((el) => {
    const netQuantityDependant = (el.quantity || 0) * el.price;
    const netWeightDependant = (el.weight || 0) * el.price;

    const netWithoutPromotion =
      el.unitType === 'piece' ? netQuantityDependant : netWeightDependant;
    const promotion = el.percent + el.special;
    const productNet =
      promotion !== 0
        ? (netWithoutPromotion * (100 - promotion)) / 100
        : netWithoutPromotion;

    return {
      ...el,
      net: productNet,
    };
  });

  React.useEffect(() => {
    let total = 0;
    searchedProducts.map((el) => {
      total += el.net;
    });

    setTotalDisplayedPrice(total);
  }, [searchedProducts]);

  function handleQuantityChange(event: any, rowItem: ProductsInterface) {
    const newQuantity = parseInt(event.target.value);
    const itemCode = rowItem.code;
    const changeQuantityPayload = {
      quantity: newQuantity,
      code: itemCode,
    };

    dispatch(changeSearchItemQuantity(changeQuantityPayload));
  }

  function handleElementDelete(rowItem: ProductsInterface) {
    if (rowItem?.code === selected) {
      props.onItemSelect(null);
      setSelected(null);
    }
    dispatch(removeSearchItem(rowItem.code));
  }

  function handleSpecialPromotion(e: any, rowItem: ProductsInterface) {
    const newSpecial = parseInt(e.target.value);
    const itemCode = rowItem.code;
    const changeSpecialPayload = {
      special: newSpecial,
      code: itemCode,
    };

    dispatch(changeSearchItemSpecialPromotion(changeSpecialPayload));
  }

  function handleUnitChange(e: any, rowItem: ProductsInterface) {
    const newUnit = parseInt(e.target.value);
    const itemCode = rowItem.code;
    const changeUnitPayload = {
      unit: newUnit,
      code: itemCode,
    };

    dispatch(changeSearchItemUnit(changeUnitPayload));
  }

  function handleWeightChange(e: any, rowItem: ProductsInterface) {
    const newWeight = parseFloat(e.target.value);
    const itemCode = rowItem.code;
    const changeWeightPayload = {
      weight: newWeight,
      code: itemCode,
    };

    dispatch(changeSearchItemWeight(changeWeightPayload));
  }

  function handleClick(
    event: React.MouseEvent<unknown>,
    rowItem: ProductsInterface
  ) {
    if (selected === null) {
      console.log('selected null');
      props.onItemSelect(rowItem);
      setSelected(rowItem?.code);
      return;
    }

    if (selected === rowItem?.code) {
      console.log('selected === rowItem?.code');
      props.onItemSelect(null);
      setSelected(null);
      return;
    }

    if (selected !== rowItem?.code) {
      console.log('selected !== rowItem?.code ', { deded: rowItem?.code });
      props.onItemSelect(rowItem);
      setSelected(rowItem?.code);
      return;
    }
  }

  const isSelected = (code: number) => selected === code;

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
            {searchedProducts?.map((row: any) => {
              const isItemSelected = isSelected(row.code);

              return (
                <StyledTableRow
                  hover
                  tabIndex={-1}
                  key={row.code}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'quantity') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <TextField
                            size="small"
                            style={{ width: 35 }}
                            id="outlined-number"
                            type="number"
                            value={row.quantity}
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
                            value={row.special}
                            onChange={(e) => handleSpecialPromotion(e, row)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'unit') {
                      if (row.unitType === 'kg') {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={row.unit}
                                onChange={(e) => handleUnitChange(e, row)}
                              >
                                {oudUniTypeValues.map((el) => (
                                  <MenuItem value={el.value}>
                                    {el.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                        );
                      }

                      if (row.unitType === 'piece') {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <TextField
                              disabled
                              size="small"
                              style={{ width: 50 }}
                              id="outlined-number"
                              type="number"
                              value={row.unit}
                            />
                          </StyledTableCell>
                        );
                      }

                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={row.unit}
                              onChange={(e) => handleUnitChange(e, row)}
                            >
                              {oilUniTypeValues.map((el) => (
                                <MenuItem value={el.value}>{el.label}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </StyledTableCell>
                      );
                    }

                    if (column.id === 'weight') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          <TextField
                            size="small"
                            style={{ width: 50 }}
                            id="outlined-number"
                            type="number"
                            value={row.weight}
                            disabled={row.unitType === 'piece'}
                            onChange={(e) => handleWeightChange(e, row)}
                            inputProps={{
                              step: 0.1,
                            }}
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
                          <p style={{ width: 100 }}>
                            {row.englishName} - {row.arabicName}
                          </p>
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
      {searchedProducts.length > 0 && <p>Total: {totalDisplayedPrice} euros</p>}
    </Paper>
  );
}
