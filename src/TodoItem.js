import React, {useState, useContext} from 'react'
import { Context } from './Context'
import { Draggable } from 'react-draggable';

export default function TodoItem({title, id, completed, color}) {


const {removeTask,toggleTodo}=useContext(Context)



const cls = ['todo']
if (completed){
  cls.push('completed')
}




  return (
    
    <div>
    <li className={cls.join("  ")}>
      
      <label style={{backgroundColor: color, borderRadius:'10px'}}>
        <input
          type="checkbox"
          checked={completed}
          onChange={()=>toggleTodo(id)}
        />
        <span style={{color:'black'}}>{title}</span>

        <i
        onClick={()=>{removeTask(id)}}
          className="material-icons red-text"
        >
          delete
        </i>
      </label>
    </li>
    </div>
    
  )
 
}