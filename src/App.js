import React, { useState } from 'react';

function App() {
  // [[todo1], [todo2], [todo3] ....]
  /*const [todos, setTodos] = useState([
    { task: 'todo1', completed: false },
    { task: 'todo2', completed: false },
    { task: 'todo3', completed: false },
    // ...
  ]);*/
  const [todos, setTodos] = useState([]);
  
  // todos' are Strings
  const [newTodo, setNewTodo] = useState('');

  // set to null so that no todo item is being edited when the app first load
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [editingTodo, setEditingTodo] = useState('');
  

  const handleAddTodo = () => {
    if(newTodo.trim() !== ""){
      setTodos([...todos, { task: newTodo, completed: false }]);
      setNewTodo("");
    }
  }

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditingTodoIndex(null);
    setEditingTodo('');
  };

  const handleEditTodo = (index) => {
    setEditingTodo(todos[index].task);
    setEditingTodoIndex(index);
  };

  const handleSaveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { task: editingTodo, completed: newTodos[index].completed };
    setTodos(newTodos);
    setEditingTodo("");
    setEditingTodoIndex(null);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };
  const handleDeleteAll = () => {
    setTodos([]);
  }
  
  /* <textarea value={index === editingTodoIndex ? editingTodo : newTodo} onChange={(e) => setEditingTodo(e.target.value)} /> */

  return (
    <div className="todo-container">
      <h1 className="title">Todo List</h1>
      <div className="input-container">
          <textarea value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={handleAddTodo} className="add-button">Add</button>
          <button onClick={handleDeleteAll} className="delete-all-button">Delete All</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <div className="todo-left-container">
              <div className="todo-counter">{index + 1}</div>
              <div 
                className={`todo-text ${todo.completed ? "completed" : ""} ${index === editingTodoIndex ? "editing" : ""}`}
                onClick={() => handleToggleComplete(index)}
              >
                {index === editingTodoIndex ? 
                  <input 
                    value={editingTodo}
                    onChange={(e) => setEditingTodo(e.target.value)}
                  /> : todo.task
                }
              </div>
              
            </div>
            <div className="todo-right-container">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={(e) => {
                if(index !== editingTodoIndex) {
                  handleToggleComplete(index);
                }
              }}
            />
            
              {index === editingTodoIndex ? 
                  <button className="save-btn" onClick={() => handleSaveEdit(index)}>Save</button> : 
                  <button className="edit-btn"onClick={() => handleEditTodo(index)}>Edit</button>
              }
              <button  className="delete-btn" onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="counter-container">
        <div>
          Total Todos: {todos.length}
        </div>
        <div>
          Completed Todos: {todos.filter(todo => todo.completed).length}
        </div>
        <div>
          Pending Todos: {todos.filter(todo => !todo.completed).length}
        </div>
      </div>
      
    </div>
  );



}

export default App;