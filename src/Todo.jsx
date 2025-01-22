import React from 'react'
import { useState , useRef} from 'react'
import { nanoid } from 'nanoid'
import './css/reset.css'
import './css/App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'


const Component = (props) => {
    const todoItems = [
        {id: 1, name: 'Todo1', edit: false, complete: false},
        {id: 2, name: 'Todo2', edit: false, complete: false},
        {id: 3, name: 'Todo3', edit: false, complete: false}
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
            const newTodo = {id: randomNum, name: val, edit: false}
            setTodos([...todos, newTodo])
            setWarning('');
        }
        setVal('') // Empty form after submission
    }

    const complete = (e) => {
        // This returns array without the completed item by filtering the compleed item out.
        const todosAfterComplete = todos.filter((todo) => {
            if(typeof(todo.id) === 'string'){
                return todo.id !== e.target.value 
            }else{
                // Default 3 items in todoItems have number as id, 
                // but when they are returned by e.target.value, they are string.
                // So, parseInt has be utilized to compare them.
                return todo.id !== parseInt(e.target.value) 
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
        const todosAfterUpdate = todos.map((todo) => {
            if(todo.id === _id){
                if(todo.name === _editVal){
                    // If the data entry is same as existing value, it just turns edit flag to false
                    setWarning('You did not change the item')
                    setVisible(true)
                    setTimeout(() => {
                        setVisible(false)
                    },3000)
                    return {...todo, edit: false}
                }else if( _editVal === ''){
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

	return(
        <React.Fragment>
            <div className='zenDo'>
                <h1><img className="zendo-logo" src="/zendo-logo.png" alt="zendo-logo"/></h1>
                <div className='remainingCount'>1</div>
                <TodoList todos={todos} setTodos={setTodos} complete={complete} val={val} changeHandler={changeHandler} todoEdit={todoEdit} updateTodo={updateTodo} warning={warning} setWarning={setWarning}/>
                <TodoForm todos={todos} setTodos={setTodos} clickHandler={clickHandler} changeHandler={changeHandler} warning={warning} val={val} visible={visible} setVisible={setVisible}/>
            </div>
        </React.Fragment>
    )
}

export default Component
