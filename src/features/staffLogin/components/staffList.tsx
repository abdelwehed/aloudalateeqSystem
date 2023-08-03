import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  List,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useAppDispatch } from 'renderer/hooks';
import { StaffInterface, staffs } from 'dummyData/staff';
import { useState } from 'react';
import { setStaff } from '../staffLoginReducer';

export default function StaffList(props: any) {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [staffPasswordInput, setstaffPasswordInput] = useState<string | null>(
    null
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function passwordInputHasError(): boolean {
    return staffPasswordInput === null || staffPasswordInput === '';
  }

  const handleChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  function handleLoginStaffClick(staff: StaffInterface) {
    setIsFormSubmitted(true);

    if (passwordInputHasError()) {
      return;
    }

    setTimeout(() => {
      // simulate login taff (to verify if we fetch locally and in database or only database)
      // if login success navigate to dashboard
      // if login error keep the same screen of payment, and display error message
      const loginStaffRequest = staffs.filter(
        (el) => el.email === staff.email
      )[0]; // todo: include verifying password when login

      setIsFormSubmitted(false);

      if (loginStaffRequest) {
        dispatch(setStaff(loginStaffRequest));
        props.handleCloseStaffListModal();
        setstaffPasswordInput(null);
      }
    }, 500);
  }

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleCloseStaffListModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        <List dense sx={{ width: 400, bgcolor: 'background.paper' }}>
          {staffs
            .filter((el) => el.email !== props.staffInfos.email)
            .map((staff, index) => {
              const labelId = `checkbox-list-secondary-label-${staff}`;
              return (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  style={{ marginTop: 5 }}
                  key={labelId}
                >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Avatar
                        alt={`Avatar n°${index + 1}`}
                        src={`/static/images/avatar/${index + 1}.jpg`}
                      />

                      <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                        {staff.firstName} {staff.lastName}
                      </Typography>
                    </Grid>
                  </AccordionSummary>

                  <AccordionDetails
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      type="text"
                      className="auth-input"
                      required
                      id="outlined-required"
                      placeholder="Password"
                      onChange={(e) => setstaffPasswordInput(e.target.value)}
                      error={isFormSubmitted && passwordInputHasError()}
                      helperText={
                        isFormSubmitted &&
                        passwordInputHasError() &&
                        'Password is required'
                      }
                      sx={{
                        m: 1,
                        width: '70%',
                        input: {
                          color: '#818181',
                          fontSize: '20px',
                          border: '2px solid #9a692b',
                          borderRadius: '5px',
                          height: '10px',
                        },
                      }}
                    />

                    <Button
                      onClick={() => handleLoginStaffClick(staff)}
                      className="auth-button"
                      variant="contained"
                      sx={{
                        height: 40,
                        marginBottom:
                          isFormSubmitted && passwordInputHasError() ? 2 : 0,
                      }}
                    >
                      <p className="button-text">ENTER</p>
                    </Button>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </List>
      </Box>
    </Modal>
  );
}
