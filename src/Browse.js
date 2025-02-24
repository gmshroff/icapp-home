import React, { useState, useEffect } from 'react';
import './styles/Browse.css';

const ANVILURL = "https://projects.icapp.co.in"

// Test data
const TEST_PROJECTS = [
    {
        uid: '1',
        title: 'Machine Learning Project',
        public_details: {
            Description: 'Generalization Capabilities in LLMs via Circuit Discovery,"Large language models (LLMs) have shown remarkable abilities to capture world knowledge and perform reasoning, yet the internal mechanisms underlying commonsense reasoning, particularly across languages, remain poorly understood. The primary goal of this project is to explore a specific form of reasoning: commonsense reasoning (that requires world knowledge along with reasoning) in terms of multiple languages. More specifically, this project aims to investigate how LLMs process commonsense reasoning tasks that require integrating world knowledge with logical inference, focusing on scenarios where commonsense knowledge is language-independent (e.g., ""water’s state at the room temperature is ‘liquid’”  remains the same across languages, but its verbalization differs). We aim to localize the neural substrates responsible for such reasoning by analyzing identical commonsense queries presented in multiple languages (e.g., English, Hindi, etc.). This work will help determine if multilingual commonsense reasoning relies on language-agnostic circuits (shared neurons across languages) or language-specific modules and whether these circuits overlap with regions handling factual knowledge retrieval.",Good command over Python Programming; Machine Learning; A course on NLP that covers fundamentals of transformer architecture; familiarity with LLM architectures; knowledge about mechanistic interpretability is a plus point.',
            Requirements: 'Python, TensorFlow, Computer Vision',
            Outcomes: 'Working ML model with 90% accuracy',
            status: 'Open',
            CustomDescription: null
        }
    },
    {
        uid: '2',
        title: 'Web Development Project',
        public_details: {
            Description: 'Create a responsive e-commerce website',
            Requirements: 'React, Node.js, MongoDB',
            Outcomes: 'Fully functional e-commerce platform',
            status: 'Open',
            CustomDescription: null
        }
    },
    {
        uid: '3',
        title: 'Mobile App Development',
        public_details: {
            Description: 'Develop a fitness tracking mobile app',
            Requirements: 'React Native, Firebase',
            Outcomes: 'Published app on App Store',
            status: 'Closed',
            CustomDescription: null
        }
    }
];

const Browse = () => {
    const [projects, setProjects] = useState([]);
    const [preferredProjects, setPreferredProjects] = useState({});
    const [draggedItem, setDraggedItem] = useState(null);

    useEffect(() => {
        console.log('called useEffect');
        const fetchData = async () => {
            try {
                const response = await fetch(`${ANVILURL}/get_projects`);
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error)
            }
        };
    
        fetchData();
    }, []);

    // useEffect(() => {
    //     // Using test data instead of fetch
    //     setProjects(TEST_PROJECTS);
    // }, []);

    const getRandomPastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 85%)`;
    };

    const updatePreference = (projectId, preferred) => {
        if (preferred) {
            assignRank(projectId);
        } else {
            removeRank(projectId);
        }
    };

    const assignRank = (projectId) => {
        const maxRank = Object.values(preferredProjects).reduce((max, rank) => 
            Math.max(max, rank), 0);
        
        setPreferredProjects(prev => ({
            ...prev,
            [projectId]: maxRank + 1
        }));
    };

    const removeRank = (projectId) => {
        setPreferredProjects(prev => {
            const { [projectId]: removed, ...rest } = prev;
            return rest;
        });
    };

    const handleDragStart = (e, projectId) => {
        if (!preferredProjects[projectId]) return;
        setDraggedItem(projectId);
        e.currentTarget.style.opacity = '0.4';
        // Required for Firefox
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', projectId);
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        // Only show drop indicator if the target is a preferred project
        const targetId = e.currentTarget.getAttribute('data-id');
        if (preferredProjects[targetId]) {
            e.currentTarget.style.borderTop = '2px solid #1e40af';
        }
    };

    const handleDragLeave = (e) => {
        // Remove visual feedback
        e.currentTarget.style.borderTop = '';
    };

    const handleDrop = (e, targetProjectId) => {
        e.preventDefault();
        e.currentTarget.style.borderTop = '';
        
        if (!draggedItem || !targetProjectId || draggedItem === targetProjectId) return;
        
        // Only allow dropping on preferred projects
        if (!preferredProjects[targetProjectId]) return;

        const draggedRank = preferredProjects[draggedItem];
        const targetRank = preferredProjects[targetProjectId];

        if (!draggedRank || !targetRank) return;

        const newPreferredProjects = { ...preferredProjects };

        // If moving down
        if (draggedRank < targetRank) {
            Object.keys(preferredProjects).forEach(key => {
                const rank = preferredProjects[key];
                if (rank > draggedRank && rank <= targetRank) {
                    newPreferredProjects[key] = rank - 1;
                }
            });
            newPreferredProjects[draggedItem] = targetRank;
        }
        // If moving up
        else {
            Object.keys(preferredProjects).forEach(key => {
                const rank = preferredProjects[key];
                if (rank >= targetRank && rank < draggedRank) {
                    newPreferredProjects[key] = rank + 1;
                }
            });
            newPreferredProjects[draggedItem] = targetRank;
        }

        setPreferredProjects(newPreferredProjects);
        setDraggedItem(null);
    };
    
    const loggedIn=false;

    return (
        <div className="browse-container">
            {loggedIn && (<div>
            <h3>Interested in a project? Mark it as preferred and rank it!</h3>
            <p style={{ textAlign: 'center', color: '#0e87c4', fontSize: '120%', marginBottom:'30px' }}>
                (Drag and drop preferred projects to reorder them)
            </p>
            </div>)}
            <div id="project-grid">
                {projects
                    .sort((a, b) => {
                        // Sort by preference first
                        const aPreferred = a.uid in preferredProjects;
                        const bPreferred = b.uid in preferredProjects;
                        if (aPreferred && !bPreferred) return -1;
                        if (!aPreferred && bPreferred) return 1;
                        if (aPreferred && bPreferred) {
                            return preferredProjects[a.uid] - preferredProjects[b.uid];
                        }
                        return 0;
                    }).sort((a,b) => {
                        if ((a.public_details.status || '').includes('Open') && ((b.public_details.status || '').includes('Open')==false)){
                          return -1
                        }
                        else if (((a.public_details.status || '').includes('Open') == false) && (b.public_details.status || '').includes('Open')){
                          return 1
                        }
                      })
                    .map((project) => {
                        const isPreferred = project.uid in preferredProjects;
                        const rank = isPreferred ? preferredProjects[project.uid] : null;

                        return (
                            <div 
                                key={project.uid}
                                className={`project-tile ${isPreferred ? 'preferred' : ''}`}
                                style={{ backgroundColor: getRandomPastelColor() }}
                                data-id={project.uid}
                                draggable={isPreferred}
                                onDragStart={(e) => handleDragStart(e, project.uid)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, project.uid)}
                            >
                                {isPreferred && <div className="rank">{rank}</div>}
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-details">
                                    <div dangerouslySetInnerHTML={{ 
                                        __html: project.public_details.CustomDescription || 
                                        `<p><strong>Description: </strong>${project.public_details.Description || ''}</p>`
                                    }} />
                                    <p><strong>Requirements: </strong> {project.public_details.Requirements}</p>
                                    <p><strong>Outcomes: </strong> {project.public_details.Outcomes}</p>
                                </div>
                                {loggedIn && (
                                    <div className="project-checkbox-container">
                                        <input 
                                            type="checkbox"
                                            id={`project-${project.uid}`}
                                            checked={isPreferred}
                                            onChange={(e) => updatePreference(project.uid, e.target.checked)}
                                            className="project-checkbox"
                                            disabled={!(project.public_details.status || '').includes('Open')}
                                        />
                                        <label htmlFor={`project-${project.uid}`}>Select as Preferred</label>
                                    </div>
                                )}
                                <div className="enrollment-status">
                                    {project.public_details.status || 'Closed'}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Browse;