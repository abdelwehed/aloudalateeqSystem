import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LogoMixed } from 'components/LogoMixed';

export default function Login() {
  let navigate = useNavigate();

  return (
    <div className="auth">
      <LogoMixed style={{ margin: '20px 0' }} />

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
            User Name
          </Typography>
          <TextField
            className="auth-input"
            required
            id="outlined-required"
            placeholder="user name"
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
            type="password"
            className="auth-input"
            required
            id="outlined-required"
            placeholder="password"
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
        <Button
          onClick={() => navigate('/dashboard')}
          className="auth-button"
          variant="contained"
        >
          <p className="button-text">Back</p>
        </Button>
        <Button
          onClick={() => navigate('/dashboard')}
          className="auth-button"
          variant="contained"
        >
          <p className="button-text">ENTER</p>
        </Button>
      </Box>
    </div>
  );
}
