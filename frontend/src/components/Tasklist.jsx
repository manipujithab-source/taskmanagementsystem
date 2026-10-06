function TaskList({
  tasks,
  onComplete,
  onEdit,
  onDelete
}) {
  return (
    <section className="task-list">
      <div className="task-list-header">
        <div>
          <h2>My Tasks</h2>
          <p>Manage and track your daily activities.</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty">
          No tasks found.
        </div>
      ) : (
        tasks.map((task) => (
          <div
            className={`task-card ${
              task.status === "Completed" ? "completed" : ""
            }`}
            key={task._id}
          >
            <button
              className="check"
              onClick={() => onComplete(task)}
            >
              {task.status === "Completed" ? "✓" : ""}
            </button>

            <div className="task-info">
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <div className="task-meta">
                <span>{task.priority}</span>
                <span>{task.category}</span>

                {task.dueDate && (
                  <span>
                    📅{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="task-actions">
              <button onClick={() => onEdit(task)}>
                ✏️
              </button>

              <button onClick={() => onDelete(task._id)}>
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default TaskList;