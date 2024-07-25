import React from 'react'
import './TodoList.css'

function TodoList(props) {
  return (
    <div className='for-list'>
      <li className='list-item'>
        {props.item}
        <span className='for-icons'>
        <i className="fa-solid fa-trash-can icon-delete"
        onClick={e=>{
          props.deleteItem(props.index)
        }}></i>       
        </span>
      </li>
    </div>
  )
}

export default TodoList
