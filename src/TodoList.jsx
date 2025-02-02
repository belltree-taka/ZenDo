import React from 'react'
import {useState} from 'react'
import { List, ListItem, Input} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';




const TodoList = ({todos, setTodos, complete, val, changeHandler, todoEdit, updateTodo, warning, setWarning}) => {
    const [ editVal, setEditVal ] = useState('')
    const editValHandler = (e) => {
        if(e.target.value.length > 50){
            setWarning('You can not add more than 50 characters')
            return;
        }else{
            setEditVal(e.target.value)
        }
    }
    const inputCancelHandler = () => {
        const todosWithAllEditFlagToFalse = todos.map((todo) => {
            return {...todo, edit: false}
        })
        setTodos([...todosWithAllEditFlagToFalse])
    }
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
                                    ><DeleteIcon/></IconButton>
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
                                    <span
                                    style={{cursor: 'pointer', width: '100%', display: 'block'}}
                                    onClick={() => {
                                        todoEdit(todo.id)
                                    }}
                                    >{todo.name}</span>
                                    }
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>: null }        
        </React.Fragment>
    )
}

export default TodoList

