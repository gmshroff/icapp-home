// App.jsx
import React, { useState } from 'react';
import './styles.css';
import banner from './banner.png';
import NavBar from './NavBar';
import Browse from './Browse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const About = () => {
  return (
    <div className="about">
      <h2>About ICAPP</h2>
      <p>
        ICAPP (Internships, Capstone Projects, and Apprenticeships Program) is designed to provide students with hands-on experience in their respective fields. 
        Our programs are tailored to bridge the gap between academic knowledge and practical application.
      </p>
      <p>
        We collaborate with industry partners to ensure that our students gain valuable insights and skills that will prepare them for their future careers.
      </p>
    </div>
  );
};

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="dialog-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const ComparisonDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="comparison-content">
        <div className="comparison-section">
          <h3>Internship:</h3>
          <ul>
            <li>Work with an industry partner or affiliated professor and earn a <em>stipend</em></li>
            <li>duration can be as little as a month to a full year</li>
            <li>online or offline</li>
            <li>one student per project</li>
            <li>earn a certificate</li>
          </ul>
        </div>

        <div className="comparison-section">
          <h3>Apprenticeship:</h3>
          <ul>
            <li>Work with an industry partner or affiliated professor: <em>no stipend</em></li>
            <li>duration can be as little as a month to a full year</li>
            <li>online or offline</li>
            <li>one student per project</li>
            <li>earn a certificate</li>
          </ul>
        </div>
        <div className="comparison-section">
          <h3>Capstone Project:</h3>
          <ul>
            <li>Enrol in a curated project-based learning defined by an industry partner or affiliated professor</li>
            <li>online</li>
            <li>Runs like a course assignment, i.e., many students doing the same project</li>
            <li>may require payment of a <em>fee</em> as in an online course</li>
            <li>earn a certificate</li>
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

const MainContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGetStarted = () => {
    window.open('https://projects.icapp.co.in', '_blank', 'noopener noreferrer');
  };

  return (
    <>
      <section className="hero">
        <h1>Need Technology Experience?</h1>
        <p>Choose your path to gain hands-on experience in technology through our two distinct offerings</p>
    </section>

    <main className="main-content">
        <div className="offerings">
            {/* Internships & Jobs Section */}
            <div className="offering-card">
                <div className="offering-header">
                    <div className="offering-icon internships-icon">💼</div>
                    <div>
                        <h2 className="offering-title">Internships & Jobs</h2>
                        <p className="offering-subtitle">Competitive positions with companies & research labs</p>
                    </div>
                </div>
                <p className="offering-description">
                    Apply for research/engineering internships, apprenticeships, and job positions posted by companies and research organizations. These opportunities require a competitive selection process.
                </p>
                
                <div className="process-steps">
                    <h3 className="process-title">🔍 Selection Process:</h3>
                    <ol className="step-list">
                        <li className="step-item">
                            <span className="step-number">1</span>
                            <span className="step-text">Browse available positions and submit your application</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">2</span>
                            <span className="step-text">Complete AI-driven online assessment quiz</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">3</span>
                            <span className="step-text">Participate in automated video interview</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">4</span>
                            <span className="step-text">Get matched to suitable opportunities</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">5</span>
                            <span className="step-text">Start your internship/job and earn completion certificate</span>
                        </li>
                    </ol>
                </div>
                {/* <button className="cta-button" onClick={() => window.location.href = '/browse'}>Browse Positions</button> */}

            </div>

            {/* Capstone Projects Section */}
            <div className="offering-card capstone-card">
                <div className="offering-header">
                    <div className="offering-icon capstone-icon">🎓</div>
                    <div>
                        <h2 className="offering-title">Capstone Projects</h2>
                        <p className="offering-subtitle">Self-paced learning modules for everyone</p>
                    </div>
                </div>
                <p className="offering-description">
                    Enroll in structured capstone projects and learning modules designed for self-paced skill development. Open to all participants without any selection criteria.
                </p>
                
                <div className="process-steps">
                    <h3 className="process-title">📚 Enrollment Process:</h3>
                    <ol className="step-list">
                        <li className="step-item">
                            <span className="step-number">1</span>
                            <span className="step-text">Browse available capstone projects and modules</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">2</span>
                            <span className="step-text">Enroll instantly in projects of your choice</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">3</span>
                            <span className="step-text">Complete projects at your own pace</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">4</span>
                            <span className="step-text">Submit your completed project work</span>
                        </li>
                        <li className="step-item">
                            <span className="step-number">5</span>
                            <span className="step-text">Receive completion certificate</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div style={{ padding: '1rem', marginBottom: '20px' }}>
                    <button
                      className="cta-button"
                      style={{ marginRight: '1rem' }}
                      onClick={() => window.open('/browse', '_blank')}
                    >
                      Browse Projects and Positions
                    </button>
                    <button
                      className="cta-button"
                      onClick={() => window.open('https://projects.icapp.co.in/', '_blank')}
                    >
                      Get Started with ICAPP
                    </button>
        </div>
        <div className="upcoming-sessions">
            <h3>Upcoming Sessions</h3>
            <p className="session-info">Summer: May - Jul 2025 (Internship Applications Closed)</p>
        </div>

        <div className="companies-section">
            <h3>For Companies and Educators</h3>
            <ul className="companies-list">
                <li>Post internships and jobs with specific deliverables</li>
                <li>Get work done by motivated students at reasonable cost</li>
                <li>Create capstone projects and learning modules</li>
            </ul>
            <p className="contact-info">Email support@icapp.co.in to register as a partner</p>
        </div>
    </main>

      <ComparisonDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div className="App">
        <NavBar toggleNav={toggleNav} isOpen={isNavOpen} />
        <div className={`main-content ${isNavOpen ? 'shifted' : ''}`}>
          <div className="banner">
            {!isNavOpen && (
              <button onClick={() => setIsNavOpen(true)} className="navbar-toggle">
                <div className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            )}
            <h1 className="banner-title">ICAPP</h1>
            <p className="banner-subtitle">Internships, Apprenticeships and Capstone Projects</p>
          </div>
          <div className="banner-image">
            <img src={banner} alt="Banner" style={{ width: '100%', height: '100px', padding: '0px'}} />
          </div>
          
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
          
          <footer style={{ fontSize: 'small', textAlign: 'center', padding: '10px' }}>
            ICAPP Technologies, a Unit of DND P(L)
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
