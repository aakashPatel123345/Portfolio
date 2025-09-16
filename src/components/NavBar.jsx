function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-pill">
          <a href="#hero" className="nav-pill-link">
            Home
          </a>
          <a href="#about" className="nav-pill-link">
            About
          </a>
          <a href="#projects" className="nav-pill-link">
            Projects
          </a>
          <a href="#contact" className="nav-pill-link">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
