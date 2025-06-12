import { useState } from 'react'
import { TextField, Button, Snackbar, Alert, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('loggedIn', 'true')
      if (typeof onLogin === 'function') onLogin()
    } else {
      setWarning('Invalid credentials')
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{ width: 300, margin: '100px auto', padding: 4, textAlign: 'center' }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
        Login
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="dense"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
      <Snackbar
        open={Boolean(warning)}
        autoHideDuration={3000}
        onClose={() => setWarning('')}
      >
        {warning ? <Alert severity="error">{warning}</Alert> : null}
      </Snackbar>
    </Paper>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}

export default Login
