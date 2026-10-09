function Navbar({
  search,
  setSearch,
  user,
  onLogout
}) {
  return (
    <header className="navbar">

      <div>
        <h1>Task Management</h1>

        <p>
          Organize your work and stay productive.
        </p>
      </div>

      <div className="search-box">
        🔍

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="profile">

        <div className="avatar">
          {user?.name
            ? user.name
                .charAt(0)
                .toUpperCase()
            : "U"}
        </div>

        <div>
          <strong>
            {user?.name || "User"}
          </strong>

          <small>
            {user?.email || "Administrator"}
          </small>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;