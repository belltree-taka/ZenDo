import React from 'react'
import { Input, Alert} from '@mui/material' 



const TodoForm = ({todos, setTodos, clickHandler, changeHandler, warning, val}) => {

    
    return(
        <React.Fragment>
            <div>
                <div>
                    { warning ? <Alert color='warning' sx={{display:'block', width: '80%', maxWidth: 600, margin: '10px auto 0'}}>{warning}</Alert> : null }
                </div>
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

