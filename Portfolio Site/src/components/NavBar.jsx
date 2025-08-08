function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            [Your Name]
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
