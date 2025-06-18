import TaskList from './components/TaskList.jsx';
import { useState } from 'react';
import './App.css';

// Wave 3: Udate App to store the list of task data in state.
// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ]);

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id == taskId) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks => {
      return tasks.filter(task => {
        return task.id !== taskId;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList onToggleTaskComplete={toggleTaskComplete} onDeleteTask={deleteTask} tasks={tasks} />}</div>
      </main>
    </div>
  );
};

export default App;
