function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">
          Get In Touch
        </h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">
              Contact Information
            </h3>
            <div className="contact-details">
              <p className="contact-item">
                <span className="contact-label">Email:</span> [your.email@example.com]
              </p>
              <p className="contact-item">
                <span className="contact-label">Phone:</span> [+1 (555) 123-4567]
              </p>
              <p className="contact-item">
                <span className="contact-label">Location:</span> [Your City, Country]
              </p>
            </div>
          </div>
          <div className="social-links">
            <h3 className="contact-subtitle">
              Social Links
            </h3>
            <div className="social-list">
              <a href="#" className="social-link">
                [LinkedIn]
              </a>
              <a href="#" className="social-link">
                [GitHub]
              </a>
              <a href="#" className="social-link">
                [Twitter/X]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
