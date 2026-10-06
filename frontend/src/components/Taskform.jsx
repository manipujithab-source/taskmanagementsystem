import { useEffect, useState } from "react";

function TaskForm({
  addTask,
  updateTask,
  editingTask,
  setEditingTask
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
      setCategory(editingTask.category || "Work");

      setDueDate(
        editingTask.dueDate
          ? new Date(editingTask.dueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
    }
  }, [editingTask]);

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const task = {
      title: title.trim(),
      description,
      priority,
      category,
      dueDate: dueDate || null
    };

    if (editingTask) {
      await updateTask(editingTask._id, task);
    } else {
      await addTask(task);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Work");
    setDueDate("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    clearForm();
  };

  return (
    <form className="task-form" onSubmit={submit}>

      <div className="form-header">
        <div>
          <h2>
            {editingTask
              ? "Edit Task"
              : "Create New Task"}
          </h2>

          <p>
            {editingTask
              ? "Update your task details"
              : "Add a new task to your list"}
          </p>
        </div>
      </div>

      <div className="form-grid">

        <div className="form-group">
          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />
        </div>

      </div>

      <div className="form-buttons">

        <button
          type="submit"
          className="add-task-button"
        >
          {editingTask
            ? "✓ Update Task"
            : "+ Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="cancel-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default TaskForm;