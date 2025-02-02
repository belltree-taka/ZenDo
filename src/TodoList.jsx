import React from 'react'
import {useState} from 'react'
import { Button, List, ListItem, Input } from '@mui/material'



const TodoList = ({todos, setTodos, complete, val, changeHandler, todoEdit, updateTodo, warning, setWarning}) => {
    const [ editVal, setEditVal ] = useState('')
    const editValHandler = (e) => {
        if(e.target.value.length > 25){
            setWarning('You can not add more than 25 characters')
            return;
        }else{
            setEditVal(e.target.value)
        }
    }

	return(
        <React.Fragment>
                    <List sx={{ width: '80%', maxWidth: 600, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, margin: 'auto', marginTop: 5 }}>
                        {todos.filter(todo => todo.completed === false).map( todo => (
                            <React.Fragment key={todo.id}>
                                <ListItem>
                                    <Button
                                    sx={{ mr: 2}}
                                    variant='contained'
                                    value={todo.id}
                                    onClick={complete}
                                    >remove</Button>
                                    {todo.edit ?
                                    <Input
                                    sx={{ width: '60%', maxWidth: 600, display: 'block'}}
                                    type='text'
                                    value={editVal}
                                    placeholder={todo.name}
                                    onChange={editValHandler}
                                    onBlur={() => {
                                        setEditVal('')
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
                                    onClick={() => {
                                        todoEdit(todo.id)
                                    }}
                                    >{todo.name}</span>
                                    }
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
        </React.Fragment>
    )
}

export default TodoList

