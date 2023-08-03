import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from 'renderer/hooks';
import { setCashFund } from 'features/cashFund/cashFundReducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent(props: any) {
  const [shiftCash, setShiftCash] = useState<number | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function handleConfirmStartCashFund() {
    if (shiftCash === null) {
      return;
    }

    dispatch(setCashFund(shiftCash));
    props.handleCloseModal();
  }

  return (
    <div>
      <Modal
        open={props.isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={style}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Important
          </Typography>
          <NewReleasesIcon
            sx={{
              color: '#0b304a',
              fontSize: 40,
              right: 22,
            }}
          />
          <Typography
            id="modal-modal-description"
            variant="h5"
            sx={{ mt: 2, color: 'gray', marginTop: 5 }}
          >
            PLEASE ENTER AMOUNT COUNTED IN CASH
          </Typography>
          <TextField
            type="number"
            className="auth-input"
            required
            id="outlined-required"
            placeholder="CASH COUNT"
            onChange={(e) => setShiftCash(parseInt(e.target.value))}
            sx={{
              m: 1,
              width: '100%',
              input: {
                color: '#818181',
                fontSize: '20px',
                border: '2px solid #9a692b',
                borderRadius: '5px',
                height: '10px',
              },
            }}
          />
          <Grid container justifyContent="space-around">
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{ backgroundColor: 'red' }}
              onClick={() => navigate('/login')}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              endIcon={<CheckIcon />}
              sx={{ backgroundColor: 'green' }}
              onClick={handleConfirmStartCashFund}
            >
              Confirm
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
