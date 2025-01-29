import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import './scss/reset.scss'
import './scss/App.scss'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import Button from "@mui/material/Button"; //テスト
import _default from 'eslint-plugin-react-refresh'


const Component = (props) => {
    const todoItems = [
        {id: 1, name: 'Todo1', edit: false, completed: false},
        {id: 2, name: 'Todo2', edit: false, completed: false},
        {id: 3, name: 'Todo3', edit: false, completed: false}
    ]

    const [todos, setTodos] = useState([...todoItems])
    const [ val, setVal ] = useState('');
    const [ warning, setWarning ] = useState('');
    const [ visible, setVisible ] = useState(false);


    const changeHandler = (e) => {
        setVal(e.target.value)
    }

    const clickHandler = (e) => {
        e.preventDefault();    
        const duplicationCheck = todos.some((todo) => {
            return todo.name === val
        })
        if( duplicationCheck ){
            // If there is a duplicated entry
            // the follwoing code returns array without the duplicated data
            const cleanList = todos.filter(function (x, i, self) { 
                return (self.findIndex(function (y) {
                    return (x.name === y.name)
                }) === i);
            });
            setTodos([...cleanList])
            setWarning('This items already exists');
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            },3000)
        }else if( val === '' ){  // Empty Data Entry Warning
            setWarning('You can not add empty item')
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            },3000)
        }else{
            const randomNum = nanoid();
            const newTodo = {id: randomNum, name: val, edit: false, completed: false}
            setTodos([...todos, newTodo])
            setWarning('');
        }
        setVal('') // Empty form after submission
    }

    const complete = (e) => {
        // item that has matching id gets its completed flag turned on(true)
        const todosAfterComplete = todos.map((todo) => {
            if(todo.id.toString() === e.target.value){
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

        const duplicationCheck = todos.some((todo) => {
            return todo.name === _editVal
        })

        if ( duplicationCheck ){
            
            const todosWithAllEditFlagToFalse = todos.map((todo) => {
                return {...todo, edit: false}
            })
            setWarning('This item already exists in the list')
            setVisible(true)
                    setTimeout(() => {
                        setVisible(false)
                    },3000)
            setTodos([...todosWithAllEditFlagToFalse])
            
        } else {
            const todosAfterUpdate = todos.map((todo) => {
                if(todo.id === _id){
                    if( _editVal === ''){
                        setWarning('You can not add empty item')
                        setVisible(true)
                        setTimeout(() => {
                            setVisible(false)
                        },3000)
                        return {...todo, name: todo.name, edit: false}
                    }else{
                        // If the data entry is diffrent from the existing value and no empty value, then update with new value(name)
                        return {...todo, name: _editVal, edit: false}
                    }
                }else{
                    return {...todo}
                }
            })
            setTodos(todosAfterUpdate)
        }
    }

    
    const remainingCount = todos.filter(todo => !todo.completed).length
    
	return(
        <React.Fragment>
            <div className='zenDo'>
                <h1><img className="zendo-logo" src="/zendo-logo.png" alt="zendo-logo"/></h1>
                <div className='remainingCount'>You have <span>{remainingCount}</span> items left</div>
                <TodoList todos={todos} setTodos={setTodos} complete={complete} val={val} changeHandler={changeHandler} todoEdit={todoEdit} updateTodo={updateTodo} warning={warning} setWarning={setWarning}/>
                <TodoForm todos={todos} setTodos={setTodos} clickHandler={clickHandler} changeHandler={changeHandler} warning={warning} val={val} visible={visible} setVisible={setVisible}/>
                <Button variant="contained" color="primary">Krenar</Button>
            </div>
        </React.Fragment>
    )
}

export default Component
