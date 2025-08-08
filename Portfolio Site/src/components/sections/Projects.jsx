function Projects() {
  const projects = [
    {
      id: 1,
      title: "[Project Name]",
      description: "[Brief description of your project]",
      tech: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
      link: "#"
    },
    {
      id: 2,
      title: "[Project Name]", 
      description: "[Brief description of your project]",
      tech: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
      link: "#"
    },
    {
      id: 3,
      title: "[Project Name]", 
      description: "[Brief description of your project]",
      tech: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
      link: "#"
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">
          My Projects
        </h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
