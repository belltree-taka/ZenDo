import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Todo.jsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Custom primary color
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}> 
      <Todo />
    </ThemeProvider>
  </StrictMode>
)
