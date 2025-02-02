import React from 'react'
import { Input, Snackbar, Alert} from '@mui/material' 



const TodoForm = ({todos, setTodos, clickHandler, changeHandler, warning, val, setWarning}) => {

    
    return(
        <React.Fragment>
            <div>
                <Snackbar
                    open={Boolean(warning)}
                    autoHideDuration={3000}
                    onClose={() => setWarning(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                    { warning ? <Alert severity="warning" color='warning' sx={{display:'block', width: '80%', maxWidth: 600, margin: '10px auto 0'}}>{warning}</Alert> : null }
                </Snackbar>
                <form onSubmit={clickHandler}>
                    <Input
                    sx={{ width: '80%', maxWidth: 600, margin: 'auto', marginTop: 5, display: 'block'}}
                    placeholder='Add Item Here'
                    type="text"
                    value={val}
                    onChange={changeHandler}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

export default TodoForm

