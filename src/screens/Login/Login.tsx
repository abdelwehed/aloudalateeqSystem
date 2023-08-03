import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LogoMixed } from 'components/LogoMixed';
import { useState } from 'react';
import { useAppDispatch } from 'renderer/hooks';
import { setStaff } from 'features/staffLogin/staffLoginReducer';
import firebase from 'firebase/firebase';

export default function Login() {
  const [staffEmail, setStaffEmail] = useState<string>('');
  const [staffPassword, setStaffPassword] = useState<string>('');
  const [staffLoginLoading, setStaffLoginLoading] = useState<boolean>(false);
  const [staffLoginSuccess, setStaffLoginSuccess] = useState<boolean>(false);
  const [staffLoginError, setStaffLoginError] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  function emailInputHasError(): boolean {
    return staffEmail === null || staffEmail === '';
  }

  function passwordInputHasError(): boolean {
    return staffPassword === null || staffPassword === '';
  }

  async function handleLoginStaffClick() {
    setStaffLoginError(false);
    setIsFormSubmitted(true);

    if (emailInputHasError() || passwordInputHasError()) {
      return;
    }

    setStaffLoginLoading(true);

    // if login success navigate to dashboard
    // if login error keep the same screen of payment, and display error message
    try {
      const login = await firebase.signIn(staffEmail, staffPassword);
      setStaffLoginLoading(false);
      setIsFormSubmitted(false);

      if (login?.user) {
        setStaffLoginSuccess(true);

        const userSnapshot = await firebase.getUser(login?.user.uid);
        if (userSnapshot.data()) {
          // if user exists in database
          const user = userSnapshot.data();

          dispatch(
            setStaff({
              ...user,
              uid: login?.user.uid,
              provider: login?.user.providerId,
            })
          );
        }
      }
    } catch (e) {
      setStaffLoginLoading(false);
      setIsFormSubmitted(false);
      setStaffLoginError(true);
    }
  }

  if (staffLoginSuccess) {
    navigate('/dashboard');
  }

  return (
    <div className="auth">
      <LogoMixed style={{ margin: '20px 0' }} />

      {/* raffiner le messsage selon l'erreur */}
      {staffLoginError && (
        <Typography
          className="auth-input-label"
          variant="h3"
          component="h3"
          color="red"
          style={{ marginBottom: 20 }}
        >
          An error occured please verify your credentials !
        </Typography>
      )}

      <Box
        component="form"
        className="auth-form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid display={'flex'} alignItems={'center'}>
          <Typography className="auth-input-label" variant="h3" component="h1">
            Staff Email
          </Typography>
          <TextField
            defaultValue={'new.customer11@yopmail.com'}
            className="auth-input"
            required
            id="outlined-required"
            placeholder="staff email"
            onChange={(e) => setStaffEmail(e.target.value)}
            error={isFormSubmitted && emailInputHasError()}
            helperText={
              isFormSubmitted && emailInputHasError() && 'Email is required'
            }
            sx={{
              m: 1,
              width: '30ch',
              input: {
                color: '#818181',
                fontSize: '20px',
                border: '2px solid #9a692b',
                borderRadius: '5px',
                height: '20px',
              },
            }}
          />
        </Grid>
        <Grid display={'flex'} alignItems={'center'}>
          <Typography className="auth-input-label" variant="h3" component="h1">
            Password
          </Typography>
          <TextField
            defaultValue={'12345aA!'}
            type="password"
            className="auth-input"
            required
            id="outlined-required"
            placeholder="password"
            onChange={(e) => setStaffPassword(e.target.value)}
            error={isFormSubmitted && passwordInputHasError()}
            helperText={
              isFormSubmitted &&
              passwordInputHasError() &&
              'Password is required'
            }
            sx={{
              m: 1,
              width: '30ch',
              input: {
                color: '#818181',
                fontSize: '20px',
                border: '2px solid #9a692b',
                borderRadius: '5px',
                height: '20px',
              },
            }}
          />
        </Grid>
      </Box>

      <Box className="auth-button-container">
        <Button onClick={() => {}} className="auth-button" variant="contained">
          <p className="button-text">Back</p>
        </Button>
        <Button
          onClick={handleLoginStaffClick}
          className="auth-button"
          variant="contained"
          disabled={staffLoginLoading}
        >
          <p className="button-text">ENTER</p>
          {staffLoginLoading && (
            <CircularProgress
              style={{ marginLeft: 10, width: 25, height: 25 }}
              color="primary"
            />
          )}
        </Button>
      </Box>
    </div>
  );
}
