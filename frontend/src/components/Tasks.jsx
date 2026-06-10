import { useState, useEffect } from "react";
import api from "../services/api";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {

    try {

      const response = await api.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const addTask = async () => {

    if (!title.trim()) return;

    try {

      setLoading(true);

      await api.post("/tasks", {
        title,
        status: "Pending"
      });

      setTitle("");

      fetchTasks();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const deleteTask = async (id) => {

    try {

      await api.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="card">

      <div className="card-header">

        <h2>📋 Tasks</h2>

      </div>

      <div className="task-input-container">

        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={addTask}
        >
          Add
        </button>

      </div>

      {loading && (
        <p className="loading-text">
          Adding task...
        </p>
      )}

      <div className="tasks-list">

        {tasks.length === 0 ? (

          <p className="empty-state">
            No tasks yet
          </p>

        ) : (

          tasks.map((task) => (

            <div
              className="task-item"
              key={task._id}
            >

              <span>
                {task.title}
              </span>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Tasks;