import React, { useState, useEffect } from "react";
import "./CreatePostButton.css";

function CreatePostButton() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  const [totalTodos, setTotalTodos] = useState(20);
  const [pendingTodos, setPendingTodos] = useState(9);
  const [completedTodos, setCompletedTodos] = useState(20);

  // Function to increment counts
  const incrementCounts = () => {
    setTotalTodos((prevTotalTodos) => prevTotalTodos + 1);
    setPendingTodos((prevPendingTodos) => prevPendingTodos + 1);
  };

  const handleSubmit = async () => {
    if (title === "" && body === "") {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      const randomTodo = data[Math.floor(Math.random() * data.length)];
      setPosts([{ title: randomTodo.title, id: randomTodo.id }, ...posts]);
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            userId: 1,
          }),
        }
      );
      const data = await response.json();
      setPosts([data, ...posts]);
    }

    // Increment counts
    incrementCounts();
  };

  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter((post) => post.id !== id));
    setTotalTodos((prevTotalTodos) => prevTotalTodos - 1);
    setPendingTodos((prevPendingTodos) => prevPendingTodos - 1);
  };

  const handleEdit = async (id, newTitle) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          userId: 1,
        }),
      }
    );
    const updatedPost = await response.json();
    setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setPosts(data.slice(0, 10));
    };
    fetchPosts();
  }, []);

  return (
    <div className="main-container">
      <div className="second-container">
        <h1 className="header">My todo</h1>
        <p className="for-p">My todo list</p>
        <div className="for-inp">
          <input
            className="input-div"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo here..."
          />
        </div>
        <div className="main-btn">
          <button className="btn-div" onClick={handleSubmit}>
            Add
          </button>
        </div>
        <span className="for-counting">
          <h3 className="for-todos">Total todos: {totalTodos}</h3>
          <h3 className="for-todos">Pending todos: {pendingTodos}</h3>
          <h3 className="for-todos">Completed todos: {completedTodos}</h3>
        </span>
        <div className="mainUl-div">
          <ul className="ul-div">
          {posts.map((post) => (
  <li className="li-div" key={post.id}>
    {post.title}
    <div className="btn-edit&dlt">
      <button className="dlt-btn" onClick={() => handleDelete(post.id)}>
        Delete
      </button>
      <button className="edit-btn" onClick={() => {
        const newTitle = prompt("Edit todo here...", post.title);
        if (newTitle) {
          handleEdit(post.id, newTitle);
        }
      }}>
        Edit
      </button>
    </div>
  </li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreatePostButton;
