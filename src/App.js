// App.jsx
import React, { useState } from 'react';
import './styles.css';
import banner from './banner.png';
import NavBar from './NavBar';
import Browse from './Browse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <header className="header">
        <h1>Need Technology Experience?</h1>
        <p>Apply for Research/Engineering Internships, Apprenticeships and Capstone Projects</p>
        <button 
          className="link-button"
          onClick={() => setIsDialogOpen(true)}
        >
          What is the difference between these?
        </button>
      </header>

      <main>
        <section className="how-it-works">
          <h2>How does it work?</h2>
          <div className="steps">
            {[
              'Browse available projects',
              'Sign-up and Upload your CV',
              'Submit project preferences**',
              'Take a short online screening quiz*',
              'Sit for an automated online video interview***',
              'Get matched* to an internship/apprenticeship or capstone project in an upcoming session',
              'Register and execute your project on the ICAPP platform',
              'Collect your certificate of completion'
            ].map((step, index) => (
              <div key={index} className="step">
                <span className="step-number">{index + 1}.</span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="notes">
            <p>*After you have taken the quiz & video interview, it may take time for a project options to be generated for you, i.e., you will be put on a waitlist</p>
            <p>**Some capstone projects may not require any quiz or video assessment and can be started immediately.</p>
            <p>***Some projects may not require a video assessment, only the screening quiz</p>
          </div>
          <button className="get-started" onClick={handleGetStarted}>GET STARTED</button>
          <div className="how-it-works" style={{textAlign:'center',marginBottom:10}}> OR </div>
          <p style={{textAlign:'center'}}>
          <a style={{fontSize:20}} href="/browse">Browse Projects</a>
          </p>
          
        </section>

        <section className="sessions">
          <h2>Upcoming Sessions:</h2>
          <p><b>Summer: May - Jul 2025</b> (Applications Open)</p>
        </section>

        <section className="companies">
          <h2>Companies and Educators</h2>
          <ul>
            <li>Post projects with specific deliverables</li>
            <li>Get work done by motivated students at a reasonable cost</li>
          </ul>
          <p>Email support@icapp.co.in to register as a partner</p>
        </section>

        {/* Always visible About section */}
        <About />
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
