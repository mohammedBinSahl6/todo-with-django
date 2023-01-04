import './App.css';
import './mobile.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';


const AddedAlert =()=>{
  return(
    <div className='alert alert-success'>
      <p>Added Successfully</p>
    </div>
  )
}


function App() {
  const[added, setAdded] =useState(false)

  const[todos, setTodos] = useState([])
  
  useEffect(()=>{
   fetch('http://192.168.1.7:8000/todos')
   .then(res=>{
    return res.json()
   })
   .then(data=>{
    console.log(data)
    setTodos(data)
 
   })
  },[])
  
  const add = (e)=> {
    e.preventDefault()
   
  setAdded(true)
  
  }
  const reset = ()=> setAdded(false)
 return(
  <div>
    {added? <AddedAlert />:null}
  
  <div className='row p-5'>
    <h1 className='text-center head text-white'>Todo App</h1>
  </div>

  <div className='container-fluid p-3 mt-5'>
    <TodoForm add={add} reset={reset} setTodos={setTodos} todos={todos} />
  </div>

  <div className='todo-list-holder container-fluid p-3'>
    <h1 className='text-center'>My tasks</h1>


    <div className='tasks'>
     {todos &&  <TodoList todos={todos} setTodos={setTodos} />}
    </div>
  </div>
</div>
 )
}

export default App;
