import axios from "axios"
import { useState } from "react";
import UpdateModal from "./UpdateModal";

export default function TodoList({todos ,setTodos}){
  const [show , setShow]= useState(false)
  const[record, setRecord] = useState(null)

  const completedTodos = todos.filter(t =>{
   return t.completed===true
  })
  const incompletedTodos = todos.filter(t =>{
    return t.completed===false
  })


   const handleChange=(e)=>{
    setRecord({
        ...record,
        name: e.target.value
    })
   }

   const deleteTodo=(id)=>{
    axios.delete(`/api/todos/${id}`)
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

    const updateTodo = async (id, value)=>{
    axios.patch(`/api/todos/${id}/`, value)
    .then(res=>{
        const {data} = res;
        const newTodos = todos.map((t)=>{
            if(t.id === id){
                return data
            }
            return t
        })
        setTodos(newTodos)
    }).catch(()=>{
        alert('somthing wrong in updating')
    })
   }
   
    return (
       <div className="todoList p-5">
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
                  <i className="bi bi-pencil-square"onClick={()=>setShow(true)} ></i>
                  <i className="bi bi-trash3-fill" onClick={()=> deleteTodo(t.id) } ></i>
                  </span>
                </li>
                    
                ))}
                 {completedTodos.map((t)=>(
                  <li key={t.id} className="list-group-item completed">
                  {t.name}
                  <span className="bar">
                  <i className="bi bi-check2-circle" onClick={()=>{
                    updateTodo(t.id, {
                        completed : !t.completed
                    })
                  }}></i>
                  <i className="bi bi-pencil-square"onClick={()=>setShow(true)} ></i>
                  <i className="bi bi-trash3-fill" onClick={()=> deleteTodo(t.id) } ></i>
                  </span>
                </li>
                    
                ))}
                 <li className="list-group-item">
                  dodo
                  <span className="bar">
                  <i className="bi bi-check2-circle" ></i>
                  <i className="bi bi-pencil-square" onClick={()=>setShow(true)} ></i>
                  <i className="bi bi-trash3-fill"></i>
                  </span>
                </li>
              
               
            </ul>

            {show?<UpdateModal setShow={setShow} record={record} handleChange={handleChange} saveChanges={saveChanges} />:null}
        </div>
    )
}