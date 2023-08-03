import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [editmode,setEditmode]=useState(false);
  const [id,setId]=useState('');
  const [reload,setReload]=useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
      const newTask={
          title,
          description,
          status,
      };
    if(editmode){
      axios.put(`https://task-mohan.vercel.app/tasks/${id}`,newTask)
      .then(response => {
        setTitle('');
        setDescription('');
        setStatus('');
        setEditmode(false);
        setId('');
        setReload(!reload);
      })
      .catch(error => {
        console.error('Error adding new task:', error.message);
      });
    }
    else{
      axios.post('https://task-mohan.vercel.app/tasks', newTask)
        .then(response => {
          setTitle('');
          setDescription('');
          setStatus('');
          setReload(!reload);
        })
        .catch(error => {
          console.error('Error adding new task:', error.message);
        });
    }
  };

  const handleDelete = (taskId) => {
    axios.delete(`https://task-mohan.vercel.app/tasks/${taskId}`)
      .then(response => {
        setReload(!reload);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEdit=(task)=>{
    setEditmode(true);
    setTitle(`${task.title}`);
    setDescription(`${task.description}`);
    setStatus(`${task.status}`);
    setId(`${task._id}`);
  };

  useEffect(() => {
    axios.get('https://task-mohan.vercel.app/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, [reload]);

  return (
    <div className="taskContainer">
      <div className="headingList">
        <h3 className="titleH">Title</h3>
        <h3 className="descriptionH">Description</h3>
        <h3 className="statusH">Status</h3> 
      </div>
      <ul className="list">
        {tasks.map(task => (
          <li key={task._id}>
            <div className="taskData">
              <div className="titleEditcon">
                <button className="editBtn" onClick={() => handleEdit(task)}>
                <FontAwesomeIcon className="deleteIcon" icon={faEdit} />
                </button>
                <h3 className="title">{task.title}</h3>
              </div>
              <p className="description">{task.description}</p>
              <p className="status">{task.status}</p>
              <button className="deleteBtn" onClick={() => handleDelete(task._id)}>
              <FontAwesomeIcon className="deleteIcon" icon={faTrash} />
              </button>  
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className="formContainer">
          <input
            className="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="title"
          />
          <input
            className="desInput"
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={status || ''}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {editmode ?<button className="addBtn" type="submit">Update</button> : <button className="addBtn" type="submit">Add</button>}
        
        </div>
      </form>
    </div>
  );
};

export default TaskList;
