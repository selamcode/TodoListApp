import React, { useState } from 'react';

function App() {
  // initialize an empty array to hold todo items
  const [todos, setTodos] = useState([]);

  // initialize a string to hold the value of the new todo item input
  const [newTodo, setNewTodo] = useState('');

  // set to null so that no todo item is being edited when the app first load
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);

  // initialize a string to hold the value of the todo item being edited
  const [editingTodo, setEditingTodo] = useState('');

  // handle the addition of a new todo item
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') { // make sure the new todo item is not empty or whitespace
      // add the new todo item to the todos array
      setTodos([...todos, { task: newTodo, completed: false }]);
      // reset the newTodo input to an empty string
      setNewTodo('');
    }
  }

  // handle the deletion of a todo item
  const handleDeleteTodo = (index) => {
    // create a copy of the todos array
    const updatedTodos = [...todos];
    // remove the todo item at the specified index
    updatedTodos.splice(index, 1);
    // update the todos state with the new array
    setTodos(updatedTodos);
    // reset the editingTodoIndex state to null
    setEditingTodoIndex(null);
    // reset the editingTodo state to an empty string
    setEditingTodo('');
  };

  // handle the editing of a todo item
  const handleEditTodo = (index) => {
    // set the value of the editingTodo state to the current todo item being edited
    setEditingTodo(todos[index].task);
    // set the index of the todo item being edited
    setEditingTodoIndex(index);
  };

  // handle the saving of an edited todo item
  const handleSaveEdit = (index) => {
    // create a copy of the todos array
    const newTodos = [...todos];
    // update the task property of the todo item being edited with the new value
    newTodos[index] = { task: editingTodo, completed: newTodos[index].completed };
    // update the todos state with the new array
    setTodos(newTodos);
    // reset the editingTodo state to an empty string
    setEditingTodo('');
    // reset the editingTodoIndex state to null
    setEditingTodoIndex(null);
  };

  // handle toggling the completed state of a todo item
  const handleToggleComplete = (index) => {
    // create a copy of the todos array
    const updatedTodos = [...todos];
    // toggle the completed state of the todo item at the specified index
    updatedTodos[index].completed = !updatedTodos[index].completed;
    // update the todos state with the new array
    setTodos(updatedTodos);
  };

  // handle the deletion of all todo items
  const handleDeleteAll = () => {
    // set the todos state to an empty array
    setTodos([]);
  }

  return (
    <div className="todo-container">
      {/* The title of the app */}
      <h1 className="title">Todo List</h1>
      {/* The container for the input to add a new todo item */}
      <div className="input-container">
        {/* The text area where the user enters a new todo item */}
        <textarea value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        {/* The button to add the new todo item */}
        <button onClick={handleAddTodo} className="add-button">Add</button>
        {/* The button to delete all the todo items */}
        <button onClick={handleDeleteAll} className="delete-all-button">Delete All</button>
      </div>
      {/* The list of all the todo items */}
      <ul>
        {/* Loop through each todo item in the todos array */}
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {/* The container for the todo item */}
            <div className="todo-left-container">
              {/* The counter for the todo item */}
              <div className="todo-counter">{index + 1}</div>
              {/* The text of the todo item, can be clicked to toggle its completion */}
              <div
                className={`todo-text ${todo.completed ? "completed" : ""} ${index === editingTodoIndex ? "editing" : ""}`}
                onClick={() => handleToggleComplete(index)}
              >
                {/* If the todo item is being edited, display a text input instead of the task text */}
                {index === editingTodoIndex ? 
                  <input 
                    value={editingTodo}
                    onChange={(e) => setEditingTodo(e.target.value)}
                  /> : todo.task
                }
              </div>
            </div>
            {/* The container for the buttons on the right of the todo item */}
            <div className="todo-right-container">
              {/* The checkbox to toggle the completion of the todo item */}
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={(e) => {
                  if(index !== editingTodoIndex) {
                    handleToggleComplete(index);
                  }
                }}
              />
              {/* If the todo item is being edited, display a save button. Otherwise, display an edit button */}
              {index === editingTodoIndex ? 
                <button className="save-btn" onClick={() => handleSaveEdit(index)}>Save</button> : 
                <button className="edit-btn"onClick={() => handleEditTodo(index)}>Edit</button>
              }
              {/* The button to delete the todo item */}
              <button className="delete-btn" onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* The container for the todo item counters */}
      <div className="counter-container">
        {/* The total number of todo items */}
        <div>
          Total Todos: {todos.length}
        </div>
        {/* The number of completed todo items */}
        <div>
          Completed Todos: {todos.filter(todo => todo.completed).length}
        </div>
        {/* The number of incomplete todo items */}
        <div>
          Pending Todos: {todos.filter(todo => !todo.completed).length}
        </div>
      </div>
    </div>
  );
}
  export default App;