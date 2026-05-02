import React, { useState, useEffect } from 'react';
import './styles/Browse.css';

const ANVILURL = "https://projects.icapp.co.in"

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
                        if ((a.public_details.status || '').includes('Open') && ((b.public_details.status || '').includes('Open')===false)){
                          return -1
                        }
                        else if (((a.public_details.status || '').includes('Open') === false) && (b.public_details.status || '').includes('Open')){
                          return 1
                        }
                        return 0;
                      }).sort((a, b) => {
                        const aIsNew = (a.public_details.is_new || '').toLowerCase() === 'yes';
                        const bIsNew = (b.public_details.is_new || '').toLowerCase() === 'yes';
                        if (aIsNew && !bIsNew) return -1;
                        if (!aIsNew && bIsNew) return 1;
            
                        // Now, both are new or both are not new. Sort by Open/Closed status.
                        const aIsOpen = (a.public_details.status || '').toLowerCase().includes('open');
                        const bIsOpen = (b.public_details.status || '').toLowerCase().includes('open');
                        if (aIsOpen && !bIsOpen) return -1;
                        if (!aIsOpen && bIsOpen) return 1;
            
                        // Otherwise, preserve original order
                        return 0;
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
                                <h3 className="project-title">{project.title}
                                {(project.public_details.is_new || 'no') === 'yes' && (<div class="new-badge"><div>New</div></div>)}
                                </h3>
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