import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import { Typography } from '@mui/material';


const Todo = () => {
    // Sample Data
    const todoItems = [
        {id: 1, name: 'Todo1', edit: false, completed: false},
        {id: 2, name: 'Todo2', edit: false, completed: false},
        {id: 3, name: 'Todo3', edit: false, completed: false}
    ]

    const [todos, setTodos] = useState([...todoItems])
    const [ val, setVal ] = useState('');
    const [ warning, setWarning ] = useState('');


    const changeHandler = (e) => {
        if(e.target.value.length > 50){
            setWarning('You can not add more than 50 characters')
            return;
        }else{
            setVal(e.target.value)
        }
    }

    const clickHandler = (e) => {
        e.preventDefault();

        const duplicatedItems = todos.filter((todo) => todo.name === val);

        if (duplicatedItems.length !== 0) {
            if (duplicatedItems[0].completed) {
                // This checks if there is an item that has a same name with an umcompleted status
                const isAlreadyAdded = todos.some((todo) => todo.name === val && !todo.completed);
                if (!isAlreadyAdded) {
                // This does not allow new item input if there is a same name with an umcompleted status 
                    const randomNum = nanoid();
                    const newTodo = { id: randomNum, name: val, edit: false, completed: false };
                    setTodos([...todos, newTodo]);
                    setWarning('');
                } else {
                    setWarning('This item already exists');
                }
            } else {
                setWarning('This item already exists');
            }
        } else if (val === '') {
            // Empty Data Entry Warning
            setWarning('You can not add empty item');
        } else {
            const randomNum = nanoid();
            const newTodo = { id: randomNum, name: val, edit: false, completed: false };
            setTodos([...todos, newTodo]);
            setWarning('');
        }
        setVal(''); // Empty form after submission
    }

    const complete = (_id) => {
        // item that has matching id gets its completed flag turned on(true)
        const todosAfterComplete = todos.map((todo) => {
            if(todo.id.toString() === _id.toString()){
                return {...todo, completed: true}
            }else{
                return {...todo}
            }
        })
        setTodos(todosAfterComplete)
    }

    const todoEdit = (_id) => {
        const todosAfterEdit = todos.map((todo) => {
            // If id matches within the loop
            if(todo.id === _id){
                return { ...todo, edit: !todo.edit};
            }else{
            // this ensures editing is allowed only one item at a time
                return { ...todo, edit: false}
            } 
        })
        setTodos(todosAfterEdit)
    }

    const updateTodo = (_id, _editVal) => {
        // check if there is a item that has same name with uncompleted status
        const duplicationCheck = todos.some((todo) => {
            return todo.name === _editVal && !todo.completed;
        });
    
        if (duplicationCheck) {
            // if there is a duplicated item with uncompleted status,
            // it does not allow editing
            const todosWithAllEditFlagToFalse = todos.map((todo) => {
                return { ...todo, edit: false };
            });
            setWarning('This item already exists in the list');
            setTodos([...todosWithAllEditFlagToFalse]);
        } else {
            // if there is no duplicated item
            const todosAfterUpdate = todos.map((todo) => {
                if (todo.id === _id) {
                    if (_editVal === '') {
                        setWarning('You can not add empty item');
                        return { ...todo, name: todo.name, edit: false };
                    } else {
                        // Allow update
                        return { ...todo, name: _editVal, edit: false };
                    }
                } else {
                    return { ...todo };
                }
            });
            setTodos(todosAfterUpdate);
            setWarning('');
        }
    };

    const inputCancelHandler = () => {
        const todosWithAllEditFlagToFalse = todos.map((todo) => {
            return {...todo, edit: false}
        })
        setTodos([...todosWithAllEditFlagToFalse])
    }

    const [ editVal, setEditVal ] = useState('')

    const editValHandler = (e) => {
            if(e.target.value.length > 50){
                setWarning('You can not add more than 50 characters')
                return;
            }else{
                setEditVal(e.target.value)
            }
    }
    
    const remainingCount = todos.filter(todo => !todo.completed).length
    
	return(
        <React.Fragment>
                <header style={{width: '80%', paddingTop: '30px', maxWidth: 600, margin: '0 auto'}}>
                    <h1>
                        Todo App
                        <img style={{width:'50px', height:'50px', verticalAlign: 'bottom', marginLeft:'10px'}}src="logo.svg" alt="logo"/>
                    </h1>
                </header>
                <Typography sx={{display: 'block', width: '80%', maxWidth: 600, margin: '20px auto 0', fontWeight: 'bold'}}>
                    <Typography component="span" color='primary' style={{fontSize: '2rem', margin: '0 5px'}}>{remainingCount}</Typography>items left
                </Typography>
                <TodoList todos={todos} complete={complete} todoEdit={todoEdit} updateTodo={updateTodo} inputCancelHandler={inputCancelHandler} editValHandler={editValHandler} editVal={editVal} setEditVal={setEditVal}/>
                <TodoForm clickHandler={clickHandler} changeHandler={changeHandler} warning={warning} val={val} setWarning={setWarning}/>
        </React.Fragment>
    )
}

export default Todo
