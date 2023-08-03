import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'renderer/hooks';
import Modal from '@mui/material/Modal';
import { CustomerInterface, customers } from 'dummyData/customers';
import moment from 'moment';
import { selectCustomer } from '../customerReducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  { id: 'firstName', label: 'FirstName' },
  { id: 'lastName', label: 'LastName' },
  { id: 'phoneNumber', label: 'PhoneNumber' },
  { id: 'email', label: 'Email' },
  { id: 'birthDate', label: 'BirthDate' },
  { id: 'additionalNote', label: 'Notes' },
  { id: 'bills', label: 'Bills' },
];

export default function SearchCustomerComponent(props: any) {
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

      const filteredRows = customers.filter((row) => {
        const itemName = `${row.firstName} - ${row.lastName}`;
        if (
          itemName.toLowerCase().includes(searchText) ||
          row.phoneNumber?.toString().toLowerCase().includes(searchText)
        ) {
          return true;
        }
        return false;
      });

      setRows(filteredRows);
    }, 1000);
  }

  function handleQuantityChange(event: any, rowItem: CustomerInterface) {}

  function handleOnSearchedItemClick(rowItem: CustomerInterface) {
    dispatch(selectCustomer(rowItem));
    props.handleCloseModal();
  }

  function shouldDisplayResultOptions(): boolean {
    return rows.length > 0;
  }

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Typography>Search customer</Typography>
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
                    <TableCell colSpan={1} align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleOnSearchedItemClick(row)}
                      >
                        Select
                      </Button>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.firstName}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {row.lastName}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <TextField
                        size="small"
                        style={{ width: 100 }}
                        id="outlined-number"
                        type="number"
                        value={parseInt(row.phoneNumber)}
                        onChange={(e) => handleQuantityChange(e, row)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.email}
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {moment(row.birthDate).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Modal>
  );
}
