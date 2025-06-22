import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onToggleTaskComplete, onDeleteTask }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggleTaskComplete={onToggleTaskComplete}
          onDeleteTask={onDeleteTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};





TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTaskComplete: PropTypes.func.isRequired,
  onToggleTaskIncomplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default TaskList;


// How would the code change without this helper function?

// const TaskList = ({ tasks }) => {
//   return (
//     <ul className="tasks__list no-bullet">
//       {tasks.map((task) => { // The mapping logic moves directly here
//         return (
//           <Task
//             key={task.id}
//             id={task.id}
//             title={task.title}
//             isComplete={task.isComplete}
//           />
//         );
//       })}
//     </ul>
//   );
// };