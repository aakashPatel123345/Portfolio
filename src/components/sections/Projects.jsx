function Projects() {
  const projects = [
    {
      id: 1,
      title: "RAG Powered AI Chatbot",
      description: "Engineered a high-performance, RAG-powered AI Digital Twin using a decoupled Python (FastAPI)/React stack to deliver fact-based, context-aware insights on the user.",
      tech: ["[React.js]", "[FastAPI]", "[LangChain]", "[Gemini]"],
      link: "https://github.com/aakashPatel123345/Personal-AI-Chatbot",
      featured: true
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
      title: "Deep Learning Image Classifier",
      description: "Image classifier using a custom neural network with 90% accuracy",
      tech: ["[Python]", "[PyTorch]"],
      link: "https://google.com"
    }
  ]

  const featuredProject = projects.find(p => p.featured) || projects[0]
  const otherProjects = projects.filter(p => p.id !== featuredProject.id)

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">
          My Projects
        </h2>
        
        {/* Featured Project */}
        <div className="featured-project">
          <div className="featured-project-content">
            <h3 className="featured-project-title">
              {featuredProject.title}
            </h3>
            <p className="featured-project-description">
              {featuredProject.description}
            </p>
            <a href={featuredProject.link} className="featured-project-link" target="_blank" rel="noopener noreferrer">
              View Project
              <svg className="featured-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className="featured-project-background"></div>
        </div>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="projects-grid">
            {otherProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <h4 className="project-title">
                    {project.title}
                  </h4>
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
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
