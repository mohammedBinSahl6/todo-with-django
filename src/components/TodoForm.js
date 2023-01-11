import axios from "axios";
import { useState } from "react"

export default function TodoForm({ setTodos,todos}){
   const[task , setTask] = useState('')

   
   const handleChange = e => {
    setTask(e.target.value);
}

const handleSubmit = e => {
    e.preventDefault();
    if (!task) {
        alert("Please provide a valid value for todo");
        return;
    }
let randomId = Math.random(1)
    axios.post("http://192.168.1.7:8000/todos/", {
        name: task,
        id : randomId,
        completed : false
    }).then((res) => {
        setTask("");
        const { data } = res;
        console.log(data)
        setTodos([
            ...todos,
            data
        ]).catch(() => {
            alert("Something went wrong");
        })
    })
}

    return (
        <div className="todo-form p-3 my-3">
            <h2 className="text-center todo-head">Add your Tasks</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="task" className="form-label" >Task</label>
                    <input className="form-control" id="task" placeholder="do somthing...." value={task}
                    onChange={handleChange} />
                </div>
                <button className="btn add-btn" type='submit'>ADD</button>
            </form>
        </div>
    )
}