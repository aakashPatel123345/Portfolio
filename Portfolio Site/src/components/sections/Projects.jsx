function Projects() {
  const projects = [
    {
      id: 1,
      title: "Deep Learning Image Classifier",
      description: "Image classifier using a custom neural network with 90% accuracy",
      tech: ["[Python]", "[PyTorch]"],
      link: "https://google.com"
    },
    {
      id: 2,
      title: "Stock Market Analysis App", 
      description: "Full stack stock trading information platform with custom LLM integration, user functionalities, and real-time information lookup.",
      tech: ["[React.js]", "[OpenAI]", "[Polygon]"],
      link: "https://google.com"
    },
    {
      id: 3,
      title: "Nonprofit Organization Website", 
      description: "Full stack web app for a nonprofit organization resulting in hundreds of site viewers per month, increased event sales, and increased sponsor engagement.",
      tech: ["[React.js]"],
      link: "https://marylandmayuri.org"
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
