import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from '../screens/dashboard/dashboard';
import Login from 'screens/Login/Login';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e7bd67',
      main: '#9a692b',
    },
    secondary: {
      light: '#0b304a',
      main: '#04111a',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
