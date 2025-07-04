// import { useState } from 'react'; // Wave 3: Remove state
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete }) => {
  // const [complete, setComplete] = useState(isComplete); // Wave 3: Remove state
  // const buttonClass = complete ? 'tasks__item__toggle--completed' : ''; 
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : ''; // Wave 3: Use IsComplete directly


  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        // onClick={() => setComplete(!complete)} // Wave 3: Remove state
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;


function App() {
  return (
    <main>
      <h1>Attendance</h1>
      <ClassInfo></ClassInfo>
      <StudentList></StudentList>
    </main>
  );
}


///How would the code change if `{id, title, isComplete}` were replaced with `props`?

// const Task = (props) => {
//   const [complete, setComplete] = useState(isComplete);
//   const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

//   return (
//     <li className="tasks__item">
//       <button
//         className={`tasks__item__toggle ${buttonClass}`}
//         onClick={() => setComplete(!complete)}
//       >
//         {props.title} 
//       </button>
//       <button className="tasks__item__remove button">x</button>
//     </li>
//   );
// };

// Task.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   isComplete: PropTypes.bool.isRequired
// };

// export default Task;

