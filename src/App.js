import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faInfo, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    title: '',
    input: ''
  });

  const [task, setTask] = useState([])
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [visibleItem, setVisibleItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const toggleVisibility = (itemId) => {
    setVisibleItem(itemId === visibleItem ? null : itemId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAdd = (e) => {
    e.preventDefault();

    if (formData.title.trim() === '' || formData.input.trim()==='') {
      setErrorMessage('Title or input can not be empty.');
      return;
    }else{
      setTask([...task, formData])
      setFormData({ title: '', input: '' })
      setErrorMessage('');
    }
  }

  const handleEdit = (item, index) => {
    setFormData({ ...formData, title: item.title, input: item.input })
    setIndex(index)
    setToggle(false)
    setErrorMessage('');
  }

  const handleDelete = () => {
    const newData = task.filter((_, i) => i !== index);
    setTask(newData);
  }

  const finalSubmit = () => {

    if (formData.title.trim() === '' || formData.input.trim()==='') {
      setErrorMessage('Title or input can not be empty.');
      return;
    }else{
      task[index] = formData
      setTask([...task])
      setFormData({ title: '', input: '' })
      setToggle(!toggle)
      setErrorMessage('');
    }
       
  }

  return (
    <div className="App">
      <div className='header'>
        <h4>GYIZER</h4>
        <p>TODO APP</p>
      </div>
      {
        toggle === true ?
          <div className='form_design'>
            <div>
              <input name='title' value={formData.title} onChange={handleChange} placeholder='Title...' />
              <input name='input' value={formData.input} onChange={handleChange} placeholder='Input...' />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div>
              <div className='add_button' onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
          </div>
          :
          <div className='form_design'>
            <div>
              <input name='title' value={formData.title} onChange={handleChange} placeholder='Title...' />
              <textarea type="text" className='input_height' name='input' value={formData.input} onChange={handleChange} placeholder='Input...' />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div>
              <div style={{ color: "white", fontSize: "8px" }} className='add_button' onClick={finalSubmit} >UPDATE</div>
            </div>
          </div>
      }
      <div className="task_list row ">

        {
          task.length > 0 ?
            task.map((item, index) => {
              return (
                <div key={index} className='col-sm-12 col-lg-4 col-md-6 p-4'>
                  <div className='items'>
                  <div>
                    <h5>{item.title} </h5>
                    <p>{item.input}</p>
                  </div>
                  
                  <div>
                    {
                      visibleItem === index ?
                        <div className='pe-2' style={{ display: "flex" }}>
                          <div className='info_button ' onClick={(e) => handleEdit(item, index)}><FontAwesomeIcon icon={faEdit} /></div>
                          <div className='info_button ' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setIndex(index)}><FontAwesomeIcon icon={faTrash} /></div>
                        </div>
                        :
                        <div className="pe-2">
                        <div className='info_button btn' onClick={() => toggleVisibility(index)}><FontAwesomeIcon icon={faInfo} /></div>
                        </div>
                    }
                  </div>
                  </div>
                </div>
              )
            })
            :
            <div className='no_task'>
              <p>No tasks</p>
            </div>
        }
      </div>

      <div class="modal fade modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " style={{ width: "200px" , margin:"auto"}}>
          <div class="modal-content">
            <div class="modal-body" ><p style={{ backgroundColor: "#1B1A17", color: "white" }}> Delete this task?</p>
              <div class="gap-3">
                <button className='btn alert_button_design' type="button" data-bs-dismiss="modal" onClick={(e) => handleDelete(index)}> Yes</button>
                <button className='btn alert_button_design' type="button" data-bs-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
