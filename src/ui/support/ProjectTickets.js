import React from 'react';

import { useParams } from 'react-router-dom';

import Tickets from './Tickets';

const ProjectTickets = () => {
  const { projectName } = useParams();
  return (
    <div>
      <h1>{projectName} Tickets</h1>
      <Tickets projectsOverride={[projectName]} />
    </div>
  );
};

export default ProjectTickets;
