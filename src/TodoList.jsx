import React from 'react'
import PropTypes from 'prop-types';
import { List, ListItem, Input} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


const TodoList = ({todos, complete, todoEdit, updateTodo, inputCancelHandler, editValHandler, editVal, setEditVal}) => {
    
    const hasIncompleteTodo = todos.some((todo) => {
        return todo.completed === false
    })

	return(
        <React.Fragment>
            { hasIncompleteTodo ? <List sx={{ width: '80%', maxWidth: 600, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, margin: 'auto', marginTop: 5, overflowY: 'auto', maxHeight: 400}}>
                        {todos.filter(todo => todo.completed === false).map( todo => (
                            <React.Fragment key={todo.id}>
                                <ListItem>
                                    <IconButton
                                    sx={{ mr: 2}}
                                    onClick={() => {
                                        complete(todo.id)
                                    }}
                                    ><DeleteIcon/>
                                    </IconButton>
                                    {todo.edit ?
                                    <Input
                                    sx={{ width: '100%', maxWidth: 600, display: 'block'}}
                                    type='text'
                                    value={editVal}
                                    placeholder={todo.name}
                                    onChange={editValHandler}
                                    onBlur={() => {
                                        setEditVal('')
                                        inputCancelHandler()
                                    }}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter'){
                                            updateTodo(todo.id, editVal)
                                            setEditVal('')
                                        }else{
                                            return;
                                        }
                                    }}
                                    />
                                    :
                                    <Typography
                                    sx={{cursor: 'pointer', width: '100%', display: 'block', textWrap: 'wrap', overflowWrap: 'anywhere'}}
                                    onClick={() => {
                                        todoEdit(todo.id)
                                    }}
                                    >{todo.name}</Typography>
                                    }
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>: null }        
        </React.Fragment>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array,
    complete: PropTypes.func,
    todoEdit: PropTypes.func,
    updateTodo: PropTypes.func,
    inputCancelHandler: PropTypes.func,
    editValHandler: PropTypes.func,
    editVal: PropTypes.string,
    setEditVal: PropTypes.func,
}

export default TodoList

