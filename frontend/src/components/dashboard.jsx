function Dashboard({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="dashboard">
      <div className="welcome">
        <div>
          <h2>Good Morning! 👋</h2>
          <p>Here's what's happening with your tasks today</p>
        </div>

        <div className="progress">
          <small>Overall Progress</small>
          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span>📋</span>
          <div>
            <small>Total Tasks</small>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="stat">
          <span>✓</span>
          <div>
            <small>Completed</small>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="stat">
          <span>⌛</span>
          <div>
            <small>Pending</small>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="stat">
          <span>★</span>
          <div>
            <small>High Priority</small>
            <strong>{high}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;