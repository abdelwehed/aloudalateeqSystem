import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Container from '@mui/system/Container';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import { useAppDispatch } from 'renderer/hooks';
import { setNewCustomer } from 'features/addCustomer/customerReducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddCustomerForm(props: any) {
  const [customerFirstName, setCustomerFirstName] = useState<string | null>(
    null
  );
  const [customerLastName, setCustomerLastName] = useState<string | null>(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string | null>(
    null
  );
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Moment | null>(null);

  const dispatch = useAppDispatch();

  function handleAddCustomer() {
    const customerData = {
      firstName: customerFirstName,
      lastName: customerLastName,
      phoneNumber: customerPhoneNumber,
      email: customerEmail,
      birthDate: birthDate,
    };
    dispatch(setNewCustomer(customerData));
    props.handleCloseModal();
  }

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container sx={style} component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add a new customer
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="First Name"
                    variant="outlined"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setCustomerFirstName(e.target.value)}
                    value={customerFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setCustomerLastName(e.target.value)}
                    value={customerLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    label="Phone Number"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                    value={customerPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    value={customerEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MobileDatePicker
                    label="Birth Date"
                    inputFormat="MM/DD/YYYY"
                    value={birthDate}
                    onChange={(val) => setBirthDate(val)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                {/*                 <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAddCustomer}
              >
                Add Customer
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </Modal>
  );
}
