import React from 'react'
import {useState} from 'react'
import './css/reset.css'
import './css/App.css'


const TodoList = ({todos, setTodos, complete, val, changeHandler, todoEdit, updateTodo, warning, setWarning}) => {
    const [ editVal, setEditVal ] = useState('')
    const editValHandler = (e) => {
        setEditVal(e.target.value)
    }

	return(
        <React.Fragment>
                <div className='todoList'>
                    {/*Functional Menu has to be added here*/}
                    <ul className='todoList__items'>
                        {todos.map( todo => (
                            <React.Fragment key={todo.id}>
                                <li className='todoItem'>
                                    <button
                                    className='todoItem__remove'
                                    value={todo.id}
                                    onClick={complete}
                                    >remove</button>
                                    {todo.edit ?
                                    <input
                                    className='todoItem__edit'
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
                                    className='todoItem__name'
                                    onClick={() => {
                                        todoEdit(todo.id)
                                    }}
                                    >{todo.name}</span>
                                    }
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
        </React.Fragment>
    )
}

export default TodoList

