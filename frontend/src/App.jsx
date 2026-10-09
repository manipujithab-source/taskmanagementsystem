import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./components/Login";
import Register from "./components/Register";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

const API = "http://localhost:5000/api/tasks";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [showRegister, setShowRegister] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [editingTask, setEditingTask] = useState(null);

  // LOAD TASKS
  const loadTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data);
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  // LOAD TASKS AFTER LOGIN
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  // LOGIN
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setTasks([]);
  };

  // ADD TASK
  const addTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(API, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await loadTasks();
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // UPDATE TASK
  const updateTask = async (id, task) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`${API}/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEditingTask(null);

      await loadTasks();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await loadTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // COMPLETE TASK
  const toggleComplete = async (task) => {
    await updateTask(task._id, {
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      status:
        task.status === "Completed"
          ? "Pending"
          : "Completed"
    });
  };

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" &&
        task.status === "Pending") ||
      (filter === "Completed" &&
        task.status === "Completed") ||
      (filter === "High" &&
        task.priority === "High");

    return matchesSearch && matchesFilter;
  });

  // IMPORTANT TASKS
  const importantTasks = tasks.filter(
    (task) =>
      task.priority === "High" &&
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // CALENDAR
  const calendarTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return (
      new Date(a.dueDate) -
      new Date(b.dueDate)
    );
  });

  // =========================
  // LOGIN / REGISTER
  // =========================

  if (!user) {
    if (showRegister) {
      return (
        <Register
          onShowLogin={() =>
            setShowRegister(false)
          }
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() =>
          setShowRegister(true)
        }
      />
    );
  }

  // =========================
  // MAIN APPLICATION
  // =========================

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">

        <Navbar
          search={search}
          setSearch={setSearch}
          user={user}
          onLogout={handleLogout}
        />

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <Dashboard tasks={tasks} />

            <TaskForm
              addTask={addTask}
              updateTask={updateTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />

            <TaskList
              tasks={filteredTasks}
              onComplete={toggleComplete}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          </>
        )}

        {/* MY TASKS */}
        {activePage === "tasks" && (
          <>
            <div className="page-heading">
              <h1>My Tasks</h1>
              <p>Manage all your tasks</p>
            </div>

            <div className="filter-buttons">

              <button
                className={
                  filter === "All"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("All")
                }
              >
                All
              </button>

              <button
                className={
                  filter === "Pending"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("Pending")
                }
              >
                Pending
              </button>

              <button
                className={
                  filter === "Completed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("Completed")
                }
              >
                Completed
              </button>

              <button
                className={
                  filter === "High"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("High")
                }
              >
                High Priority
              </button>

            </div>

            <TaskForm
              addTask={addTask}
              updateTask={updateTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />

            <TaskList
              tasks={filteredTasks}
              onComplete={toggleComplete}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          </>
        )}

        {/* IMPORTANT */}
        {activePage === "important" && (
          <>
            <div className="page-heading">
              <h1>⭐ Important Tasks</h1>
              <p>Your high-priority tasks</p>
            </div>

            <TaskList
              tasks={importantTasks}
              onComplete={toggleComplete}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          </>
        )}

        {/* CALENDAR */}
        {activePage === "calendar" && (
          <>
            <div className="page-heading">
              <h1>📅 Calendar</h1>
              <p>Tasks arranged by due date</p>
            </div>

            <div className="calendar-list">

              {calendarTasks.length === 0 ? (
                <div className="empty">
                  No tasks with due dates.
                </div>
              ) : (
                calendarTasks.map((task) => (
                  <div
                    className="calendar-task"
                    key={task._id}
                  >

                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>

                    <div>
                      <strong>
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "No date"}
                      </strong>

                      <span>
                        {task.priority}
                      </span>
                    </div>

                  </div>
                ))
              )}

            </div>
          </>
        )}

      </main>

    </div>
  );
}

export default App;