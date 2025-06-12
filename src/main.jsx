import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Todo.jsx'
import Login from './Login.jsx'
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#13C900", // Custom primary color
    },
  },
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      setLoggedIn(true)
    }
  }, [])

  const handleLogin = () => setLoggedIn(true)

  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    setLoggedIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loggedIn ? (
        <Todo onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
