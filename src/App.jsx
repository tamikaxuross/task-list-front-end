import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

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

const kBaseUrl = 'http://localhost:5000';

const getallTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then( response => {
      return response.data.map(convertFromApi);
    })
    .catch( error => {
      console.log(error);
    });
};

const convertFromApi = (apiTask) => {
  const {id, title, description, completed_at} = apiTask;
  const newTask = {id, title, description, completedAt: completed_at};
  return newTask;
};

const completeTaskApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .then(response => {
      return convertFromApi(response.data);
    })
  .catch(error => {
    console.log(error);
  });
};

const incompleteTaskApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .then(response => {
      return convertFromApi(response.data);
    })
  .catch(error => {
    console.log(error);
  });
};

const addTaskApi = (title, description='', completedAt=null) => {
  const requestBody = {
    title: title,
    description: description,
    completed_at: completedAt,
  };

  return axios.post(`${kBaseUrl}/tasks`, requestBody)
    .then(response => {
      return convertFromApi(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    });
};


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const getAllTasks = () => {
    return getallTasksApi()
      .then(tasks => setTasks(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

// Wave 3 toggleTaskComplete with hardcoded data:
  // const toggleTaskComplete = (id) => {
  //   setTasks(tasks => {
  //     return tasks.map(task => {
  //       if (task.id == id) {
  //         return { ...task, isComplete: !task.isComplete };
  //       } else {
  //         return task;
  //       }
  //     });
  //   });
  // };

  const toggleTaskComplete = (id) => {
    return completeTaskApi(id)
      .then(taskResult => {
        setTasks(tasks => tasks.map(task => {
          if (task.id === taskResult.id) {
            return taskResult;
          } else {
            return task;
          }
        }));
    });
  };

  const toggleTaskInComplete = (id) => {
    return incompleteTaskApi(id)
      .then(taskResult => {
        setTasks(tasks => tasks.map(task => {
          if (task.id === taskResult.id) {
            return taskResult;
          } else {
            return task;
          }
        }));
    });
  };


  // Wave 3 Delete Task with hardcoded data:
  // const deleteTask = (id) => {
  //   setTasks(tasks => {
  //     return tasks.filter(task => {
  //       return task.id !== id;
  //     });
  //   });
  // };

    const addTask = () => {
      if (!newTaskTitle.trim()) {
        alert("Task title can't be empty.");
        return;
      }

      return addTaskApi(newTaskTitle, newTaskDescription)
        .then(newTaskResult => {
          setTasks(tasks => [...tasks, newTaskResult]);
          setNewTaskTitle('');
          setNewTaskDescription('');
        })
        .catch(error => {
          console.log(error);
        })
    }

    const deleteTask = id => {
      return deleteTaskApi(id)
        .then(()=> {
          setTasks(tasks => tasks.filter(task => {
              return task.id !== id;
          }));
        }); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div className="add-task-form">
          <input 
            type="text"
            placeholder="New task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            ></input>

            <textarea
            placeholder="Description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows="2"
            ></textarea>
            <button onClick={addTask}>Add Task</button>           
        </div>

        <div>{<TaskList onToggleTaskIncomplete={toggleTaskInComplete} onToggleTaskComplete={toggleTaskComplete} onDeleteTask={deleteTask} tasks={tasks} />}</div>
      
      </main>
    </div>
  );
};

export default App;
