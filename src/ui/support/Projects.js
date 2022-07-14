import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../hooks';

const Projects = () => {
  const [filter, setFilter] = useState('');
  const user = useUser();
  const projects = user.projects.filter((p) => !filter || p.includes(filter));
  return (
    <div>
      <h1>Projects</h1>
      <div className="mb-3">
        <div className="form-group">
          <label>Project Name Filter</label>
          <input
            type="text"
            className="form-control"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <ul>
        {projects.map((projectName) => (
          <li key={projectName}>
            <Link to={`/projects/${projectName}`}>{projectName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
