import React from 'react'
import PropTypes from 'prop-types';
import { Input, Snackbar, Alert} from '@mui/material' 



const TodoForm = ({clickHandler, changeHandler, warning, val, setWarning}) => {

    
    return(
        <React.Fragment>
            <div>
                <form style={{ position: 'relative', width: '80%', maxWidth: 600, margin: 'auto'}} onSubmit={clickHandler}>
                    <Input
                    sx={{ marginTop: 5, display: 'block'}}
                    placeholder='Add Item Here'
                    type="text"
                    value={val}
                    onChange={changeHandler}
                    />
                    <Snackbar
                        open={Boolean(warning)}
                        autoHideDuration={3000}
                        onClose={() => setWarning(null)}
                        style={{position: 'absolute', bottom: -60, left: 0}}
                        >
                        { warning ? <Alert severity="warning" color='warning'>{warning}</Alert> : null }
                    </Snackbar>
                </form>
            </div>
        </React.Fragment>
    )
}

TodoForm.propTypes = {
    clickHandler: PropTypes.func,
    changeHandler: PropTypes.func,
    warning: PropTypes.string,
    val: PropTypes.string,
    setWarning: PropTypes.func,
}

export default TodoForm

