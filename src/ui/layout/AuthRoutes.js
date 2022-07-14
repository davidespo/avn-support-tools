import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tickets from '../support/Tickets';
import Projects from '../support/Projects';
import ProjectTickets from '../support/ProjectTickets';
import CreateTicket from '../support/CreateTicket';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home showSecurity />}></Route>
      <Route path="tickets" element={<Tickets />}></Route>
      <Route path="projects" element={<Projects />}></Route>
      <Route path="projects/:projectName" element={<ProjectTickets />}></Route>
      <Route path="new" element={<CreateTicket />} />
    </Routes>
  );
};

export default AuthRoutes;
