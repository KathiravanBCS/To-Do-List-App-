import React, { useEffect, useState } from "react";
import "../Style/Todo_List.css"; // Import CSS for styling
import { FaEdit } from "react-icons/fa"; // Import edit icon
import { MdDelete } from "react-icons/md"; // Import delete icon

export const Todo_List = () => {
  // State for todos, initialized from localStorage 
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // State for input fields
  const [title, setTitle] = useState("");
  const [estimation, setEstimation] = useState("");
  const [description, setDescription] = useState("");

  // Effect to save todos to localStorage they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Function to add a new todo
  const handleAddTodo = () => {
    if (title && estimation && description) {
      const newTodo = {
        id: Date.now(), // Unique ID for the todo
        title,
        estimation: `${estimation} hrs`, // Append "hrs" to estimation
        description,
      };
      const updatedTodos = [...todos, newTodo]; // Add new todo to the list
      setTodos(updatedTodos); // Update state
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
      setTitle(""); // Clear input fields
      setEstimation("");
      setDescription("");
    } else {
      alert("Please fill all fields!"); // Alert if any field is empty
    }
  };

  // Function to delete a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo
    setTodos(updatedTodos); // Update state
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
  };

  // Function to edit a todo
  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id); // Find the todo to edit
    if (todoToEdit) {
      setTitle(todoToEdit.title); // Populate input fields with todo data
      setEstimation(todoToEdit.estimation.replace(" hrs", "")); // Remove "hrs" for editing
      setDescription(todoToEdit.description);
      handleDeleteTodo(id); // Delete the todo to replace it with updated data
    }
  };

  return (
    <div className="container">
      <div className="card-container">
        {/* Form to add a new todo */}
        <div className="Add-Todo">
          <h1>ADD TODO</h1>
          {/* input for title */}
          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* input for estimation */}
          <input
            type="number"
            name="Estimation(hrs)"
            placeholder="Estimation(hrs)"
            value={estimation}
            onChange={(e) => setEstimation(e.target.value)}
          />
          {/* input for description */}
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={handleAddTodo}>ADD</button>

        {/* Display the list of todos */}
        <div className="Todo-List">
          <h1>TODO LIST</h1>
          {todos.length === 0
            ? "" // Show nothing if no todos
            : todos.map((todo) => (
                <div key={todo.id} className="list-input-box">
                  {/* Display todo details */}
                  <input
                    type="text"
                    value={`${todo.title} - ${todo.description} (${todo.estimation})`}
                    readOnly
                  />
                  {/* Edit and delete icons */}
                  <div className="icons">
                    <FaEdit
                      onClick={() => handleEditTodo(todo.id)}
                      style={{
                        color: "white",
                        backgroundColor: "rgb(3, 145, 145)",
                        marginLeft: "-60px",
                        height: "20px",
                        width: "18px",
                        cursor: "pointer",
                      }}
                    />
                    <MdDelete
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={{
                        color: "white",
                        backgroundColor: "rgb(145, 3, 3)",
                        marginLeft: "-10px",
                        height: "20px",
                        width: "18px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};