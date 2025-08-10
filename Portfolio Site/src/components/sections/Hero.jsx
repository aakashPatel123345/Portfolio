import hero from '../../assets/hero_picture.jpg'


function Hero() {
  
  
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hello, I'm Aakash
            </h1>
            <p className="hero-subtitle">
              An aspiring software engineer
            </p>
            <a href="#contact" className="hero-cta">
              Get In Touch
            </a>
          </div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <img 
                src={hero} 
                alt="Aakash - Software Engineer"
                className="profile-image"
              />
              <div className="image-overlay">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
