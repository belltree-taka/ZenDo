import React from 'react'
import './css/App.css'


const TodoForm = ({todos, setTodos, clickHandler, changeHandler, warning, val, visible, setVisible}) => {

    
    return(
        <React.Fragment>
            <div className='todoForm'>
                <form onSubmit={clickHandler}>
                    <input
                    className='todoForm__input'
                    placeholder='Add Item Here'
                    type="text"
                    value={val}
                    onChange={changeHandler}
                    />
                </form>
                <div className='warning'>
                    <p className={`warning__text ${visible? 'fade-in': 'fade-out'}`}>{warning}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TodoForm

