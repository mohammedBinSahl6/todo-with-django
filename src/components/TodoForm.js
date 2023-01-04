import { useState } from "react"

export default function TodoForm({add,reset}){
   const[task , setTask] = useState('')
   
    return (
        <div className="todo-form p-3 my-3">
            <h2 className="text-center todo-head">Add your Tasks</h2>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="task" className="form-label">Task</label>
                    <input className="form-control" id="task" placeholder="do somthing...." value={task} />
                </div>
                <button className="btn add-btn" onMouseLeave={reset} onClick={add} type='submit'>ADD</button>
            </form>
        </div>
    )
}