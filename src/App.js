import React, {useState, useEffect} from 'react'
import TodoList from './TodoList'
import { Context } from './Context'
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable'



export default function App () {
  
const [todos, setTodos]= useState([
  {id: 1, title: 'First todo', completed: true},
  {id: 2, title: 'Second todo', completed: false},
])

const [todosTitle,setTodosTitle]= useState('')
  
const [colorBg,setColorBg]= useState(true)

useEffect(()=>{
const raw = localStorage.getItem('todos')
setTodos(JSON.parse(raw) || [])
},[])

useEffect(()=>{
  localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])



const addTodo=(e)=>{
  if(e.key === 'Enter' && todosTitle.trim() !== ''){
    setTodos([
...todos,
{ 
id: Date.now(),
title:todosTitle,
completed: false,
color: randomColor({
  luminosity: 'light',
  alpha: 0.01,
})
}
  ])
setTodosTitle('')
  }
}
const removeTask = (id) => {
  setTodos([...todos.filter((todo) => todo.id !== id)])
}
// const removeTodo=id=>{
// setTodos(todos.filter(todo=>{
//   return todo.id !== id
// }))
// }


const toggleTodo = id =>{
  setTodos(todos.map(todo =>{
    if(todo.id === id){
      todo.completed = !todo.completed
    }
    return todo
  }))
}

function changeColor(){

  if(colorBg === true){
    document.body.style.background = 'black'
    document.body.style.color = 'white'
    
    setColorBg(false)
  }else{
    document.body.style.background = 'white'
    document.body.style.color = 'black'
  // document.getElementsByClassName("input-field").style.color ='black'
    setColorBg(true)
  }

}



    return (
      <Context.Provider
      value={{
        removeTask, toggleTodo
      }}
      > 
      <div className="container">
      


      <div class="switch " style={{marginTop:'20px'}} >
    <label style={{fontSize:'20px'}}onChange={changeColor}>
      Light Mod
      <input className='' type="checkbox"/>
      <span class="lever"></span>
      Black Mod
    </label>
  </div>

        <Draggable
        axis="x"
        >
      <div 
      style={{display:'flex', cursor:'pointer',maxWidth:'50%',justifyContent:'center', margin:'0 auto', borderRadius:'50px'}}
      title='Draggab me'
      className=' waves-effect'
       >
        <i class="Medium material-icons" style={{margin: `4.5rem 0 1.68rem 0`}}>arrow_back</i>
        <h1  style={{padding:`0 20px`}}>Todo list</h1>
        <i class="Medium material-icons" style={{margin: `4.5rem 0 1.68rem 0`}}>arrow_forward</i>
      </div>
        </Draggable>
          <div className='input-field'>
            <input 
            type="text"
            value={todosTitle}
            onChange={e=>setTodosTitle(e.target.value)}
            onKeyPress={addTodo}
            style={{backgroundColor:'white', borderRadius: '10px',marginLeft:'-5px', paddingLeft:'10px'}}
            placeholder='Todo name'
            />
            
          </div>
         
         
            <TodoList todos={todos}/>
   
      </div>
      </Context.Provider>
    );
  
}