export default function UpdateModal({setShow ,record , handleChange, saveChanges}){
    return(
        <div className="upModal">
            <div className="modal-card p-3">
                <div className="row p-3">
                    <h2 className="text-center e-title">Edit the Task <i className="bi bi-pen-fill"></i></h2>
                </div>

                <input className="form-control" value={record ? record.name : ''} onChange={handleChange} />
                <div className="modal-footer pt-3">
                    <button className="btn close-btn" onClick={()=>setShow(false)}>Close</button>
                    <button className="btn add-btn" onClick={saveChanges}>Save changes</button>
                </div>
            </div>
        </div>
    )
}