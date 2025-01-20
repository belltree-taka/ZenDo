import React from 'react'
import './css/App.css'


const TodoForm = ({todos, setTodos, clickHandler, changeHandler, warning, val, visible, setVisible}) => {

    
    return(
        <React.Fragment>
            <div className='todoForm'>
                <form onSubmit={clickHandler}>
                    <input
                    className='todoForm__input'
                    type="text"
                    value={val}
                    onChange={changeHandler}
                    />
                    <input
                    className='todoForm__submit'
                    type="submit"
                    value='Add'
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

