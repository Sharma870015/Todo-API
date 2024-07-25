// import React, { useEffect, useState } from 'react';
// import './TodoInp.css';

// function TodoInp(props) {
//   const [inputText, setInputText] = useState('');
//   const [totalTodos, setTotalTodos] = useState(20);
//   const [pendingTodos, setPendingTodos] = useState(9);
//   const [completedTodos, setCompletedTodos] = useState(20);
//   const [todos, setTodos] = useState([]); // State to store fetched todos

//   const URL ='https://jsonplaceholder.typicode.com/todos'
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
//       .then(response => response.json())
//       .then(data => setTodos(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleIncrementTotal = () => {
//     setTotalTodos(totalTodos + 1);
//     setPendingTodos(pendingTodos + 1);
//     setCompletedTodos(completedTodos);
//   };

//   const handleAddTodo = () => {
//     const newTodo = {
//       id: todos.length + 1, 
//       title: inputText,
//       completed: false
//     };

//     fetch(URL, {
//       method: 'POST',
//       body: JSON.stringify(newTodo),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setTodos([data, ...todos]);
//         setInputText('');
//         handleIncrementTotal();
//       })
//       .catch(error => console.error('Error adding todo:', error));
//   };

//   const handleDeleteTodo = (id) => {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         const updatedTodos = todos.filter(todo => todo.id !== id);
//         setTodos(updatedTodos);
//         setTotalTodos(totalTodos - 1);
//         setPendingTodos(pendingTodos - 1); 
//       })
//       .catch(error => console.error('Error deleting todo:', error));
//   };

//   const handleToggleComplete = (id) => {
//     const updatedTodos = todos.map(todo => {
//       if (todo.id === id) {
//         return { ...todo, completed: !todo.completed };
//       }
//       return todo;
//     });

//     setTodos(updatedTodos);
//   };

//   function addData(newData) {
//     postData('https://jsonplaceholder.typicode.com/todos/',newData)
//     .then(response => {
//       if(response.ok) {
//         return getData('https://jsonplaceholder.typicode.com/todos/');
//       } else {
//         throw new Error ('Failed to add data');
//       }
//     })
//     .then(latestData => {
//       updateLocalState(latestData);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     })
//   }

//   async function postData (url = 'https://jsonplaceholder.typicode.com/posts', data = {}){
//     const response = await fetch (url,{
//       method:'POST',
//       headers:{
//         'Content-Type': 'application/json'
//       },
//       body:JSON.stringify(data)
//     })
//     return response;
//   }

//   async function getData(url = 'https://jsonplaceholder.typicode.com/posts'){
//     const response = await fetch (url);
//     const data = await response.json();
//     return data;
//   }

//   function updateLocalState(data) {
//     console.log('Latest data:', data);
//   }

//   const newData = {
//     name: 'John Deo',
//     age:30
//   };

//   addData(newData);

//   //POST API



//   return (
//     <div className='main-div'>
//       <header className='todo-head'>
//         <h2 className='todo-title1'>{props.title}</h2>
//       </header>
//       <p className='todo-desc1'>{props.description}</p>
//       <div className='for-input'>
//         <input 
//           className='for-input'
//           type="text"
//           placeholder='Enter todo here...'
//           value={inputText}
//           onChange={t => setInputText(t.target.value)}
//         />
//       </div>
//       <div className='for-btn'>
//         <button 
//           className='Add-btn' 
//           onClick={handleAddTodo}
//         >
//           Add
//         </button>
//       </div>
//       <span className='for-counting'>
//         <h3 className='for-todos'>Total todos: {totalTodos}</h3>
//         <h3 className='for-todos'>Pending todos: {pendingTodos}</h3>
//         <h3 className='for-todos'>Completed todos: {completedTodos}</h3>
//       </span>
//       <div className='todo-list'>
//         <ul className='for-responsive'>
//           {todos.map(todo => (
//             <li className='for-css' key={todo.id}>
//               {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
//               <div className='for-options'>
//               <button className='for-complete' onClick={() => handleToggleComplete(todo.id)}>
//                 {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
//               </button>
//               <button className='for-delete' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TodoInp;
