// App.jsx
import React, { useState } from 'react';
import './styles.css';

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

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleGetStarted = () => {
    window.open('https://icapp-program.anvil.app', '_blank', 'noopener noreferrer');
  };
  return (
    <div className="app">
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
              'sign-up and Upload your CV',
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
            <p>* After you have taken the quiz it may take time for a project options to be generated for you, i.e., you will be put on a waitlist</p>
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
          <p>Email info@icapptech.com to register as a partner</p>
        </section>
      </main>

      <ComparisonDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
};

export default App;
