import { useState, useEffect } from "react";
import api from "../services/api";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {

    try {

      const response = await api.get("/tasks");

      console.log("Tasks:", response.data);

      if (Array.isArray(response.data)) {

        const validTasks = response.data.filter(
          (task) => task.title
        );

        setTasks(validTasks);

      } else {

        setTasks([]);
      }

    } catch (error) {

      console.error("Fetch Tasks Error:", error);

      setTasks([]);
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
        title: title,
        status: "Pending"
      });

      setTitle("");

      await fetchTasks();

    } catch (error) {

      console.error("Add Task Error:", error);

    } finally {

      setLoading(false);
    }
  };

  const deleteTask = async (id) => {

    try {

      await api.delete(`/tasks/${id}`);

      await fetchTasks();

    } catch (error) {

      console.error("Delete Task Error:", error);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button
          className="primary-btn"
          onClick={addTask}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

      <div className="tasks-list">

        {tasks.length === 0 ? (

          <p>No tasks found</p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="task-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#0f172a"
              }}
            >

              <span>
                {task.title}
              </span>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
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