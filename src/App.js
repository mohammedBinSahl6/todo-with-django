import './App.css';
import './mobile.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AddedAlert =()=>{
  return(
    <div className='alert alert-success'>
      <p>Added Successfully</p>
    </div>
  )
}
const EmptyTaskAlert =()=>{
  return(
    <div className='alert alert-danger'>
      <p>Empty Task ! Write somthing</p>
    </div>
  )
}

function App() {
  const[added, setAdded] =useState(false)
  const[todos, setTodos] = useState([])
  
  useEffect(()=>{
    axios.get('/api/todos/')
    .then(res=>{
      setTodos(res.data)
    }).catch(()=>{
      alert('somthing wrong in get todos')
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

  <div className='container p-3 mt-5'>
    <TodoForm add={add} reset={reset} />
  </div>

  <div className='todo-list-holder container-fluid p-3'>
    <h1 className='text-center'>My tasks</h1>


    <div className='tasks'>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  </div>
</div>
 )
}

export default App;
