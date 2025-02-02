import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Todo.jsx'
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Padding } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#059142", // Custom primary color
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
      <Todo/>
    </ThemeProvider>
  </StrictMode>
)
