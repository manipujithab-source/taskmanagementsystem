function Navbar({ search, setSearch }) {
  return (
    <header className="navbar">
      <div>
        <h1>Task Management</h1>
        <p>Organize your work and stay productive.</p>
      </div>

      <div className="search-box">
        🔍
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="profile">
        <div className="avatar">U</div>
        <div>
          <strong>User</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}

export default Navbar;