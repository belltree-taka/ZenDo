import React from 'react'
// import './scss/reset.scss'
// import './scss/App.scss'


const TodoForm = ({todos, setTodos, clickHandler, changeHandler, warning, val, visible, setVisible}) => {

    
    return(
        <React.Fragment>
            <div className='todoForm'>
                <div className='warning'>
                    <p className={`warning__text ${visible? 'fade-in': 'fade-out'}`}>{warning}</p>
                </div>
                <form onSubmit={clickHandler}>
                    <input
                    className='todoForm__input'
                    placeholder='Add Item Here'
                    type="text"
                    value={val}
                    onChange={changeHandler}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

export default TodoForm

