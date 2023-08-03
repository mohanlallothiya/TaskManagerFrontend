import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="mainContainer">
      <h1 className="appHeading">Task Management App</h1>
      <TaskList />
    </div>
  );
}

export default App;
