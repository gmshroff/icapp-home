// App.jsx
import React, { useState } from 'react';
import './styles.css';
import banner from './banner.png';

const About = () => {
  return (
    <div className="about">
      <h2>About ICAPP</h2>
      <p>
        ICAPP (Internship, Capstone, and Apprenticeship Program) is designed to provide students with hands-on experience in their respective fields. 
        Our programs are tailored to bridge the gap between academic knowledge and practical application.
      </p>
      <p>
        We collaborate with industry partners to ensure that our students gain valuable insights and skills that will prepare them for their future careers.
      </p>
    </div>
  );
};

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleGetStarted = () => {
    window.open('https://icapp-program.anvil.app', '_blank', 'noopener noreferrer');
  };

  return (
    <div className="app">
      <title>ICAPP</title>

      <div className="banner">
        <h1 className="banner-title">ICAPP</h1>
        <p className="banner-subtitle">Internships, Apprenticeships and Capstone Projects</p>
      </div>
      <div className="banner-image">
        <img src={banner} alt="Banner" style={{ width: '100%', height: '100px', padding: '0px'}} />
      </div>

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
              'Sit for an automated online video interview',
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
          </div>
          <button className="get-started" onClick={handleGetStarted}>GET STARTED</button>
        </section>

        <section className="sessions">
          <h2>Upcoming Sessions:</h2>
          <p>Spring: Feb - May 2025</p>
          <p>Summer: Jun - Jul 2025</p>
        </section>

        <section className="companies">
          <h2>Companies and Educators</h2>
          <ul>
            <li>Post projects with specific deliverables</li>
            <li>Get work done by motivated students at a reasonable cost</li>
          </ul>
          <p>Email icapp_dev@hotmail.com to register as a partner</p>
        </section>

        {/* Always visible About section */}
        <About />
      </main>

      <footer style={{ fontSize: 'small', textAlign: 'center', padding: '10px' }}>
        ICAPP Technologies a Unit of DND P(L)
      </footer>
    </div>
  );
};

export default App;
