import axios from "axios"
import { useState } from "react";
import UpdateModal from "./UpdateModal";

export default function TodoList({todos=[] ,setTodos}){
  const [show , setShow]= useState(false)
  const[record, setRecord] = useState(null)

  const completedTodos = todos.filter(t => t.completed === true);
  const incompletedTodos = todos.filter(t => t.completed === false);
  const updateTodo = async (id, value)=>{
    axios.patch(`http://192.168.1.7:8000/todos/${id}`, value)
    .then((res) => {
        const { data } = res;
        const newTodos = todos.map(t => {
            if (t.id === id) {
                return data;
            }
            return t;
        })
        setTodos(newTodos);
    }).catch(()=>{
        alert('somthing wrong in updating')
    })
   }

   const handleChange=(e)=>{
    setRecord({
        ...record,
        name: e.target.value
    })
   }

   const deleteTodo=(id)=>{
    axios.delete(`http://192.168.1.7:8000/todos/${id}`)
    .then(()=>{
        const newTodos = todos.filter(t=>{
            return t.id !== id
        });
        setTodos(newTodos)
    }).catch(()=>{
        alert('cant delete it')
    })
   }

   const saveChanges = async ()=>{
    await updateTodo(record.id, {name: record.name })
    setShow(false)
   }

    
   
    return (
       <div className="todoList container-fluid p-5">
           
                {todos.length == 0 ? <h2 className="text-center text-white">No Tasks Yet ! <i className="bi bi-emoji-frown-fill"></i></h2>:
                
                <ul className="list-group">
                 
                 <p>Tasks : {todos.length}</p>
                <p>incompleted Todos : {incompletedTodos.length}</p>
                <p>Completed Todos : {completedTodos.length}</p>
                {incompletedTodos.map((t)=>(
                  <li key={t.id} className="list-group-item">
                  {t.name}
                  <span className="bar">
                  <i className="bi bi-check2-circle" onClick={()=>{
                    updateTodo(t.id, {
                        completed : !t.completed
                    })
                  }}></i>
                  <i className="bi bi-pencil-square"onClick={()=>{
                    setShow(true)
                    setRecord(t)
                }} ></i>
                  <i className="bi bi-trash3-fill" onClick={()=> deleteTodo(t.id) } ></i>
                  </span>
                </li>
                    
                ))}
                 {completedTodos.map((t,i)=>(
                  <li key={i} className="list-group-item completed">
                  {t.name}
                  <span className="bar">
                 
                  <i className="bi bi-pencil-square"onClick={()=>setShow(true)} ></i>
                  <i className="bi bi-trash3-fill" onClick={()=> deleteTodo(t.id) } ></i>
                  </span>
                </li>
                    
                ))}
                
              
                </ul>
                
                }
               
          

            {show?<UpdateModal  setShow={setShow} record={record} handleChange={handleChange} saveChanges={saveChanges} />:null}
        </div>
    )
}