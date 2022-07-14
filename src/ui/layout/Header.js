import React from 'react';
import { useUser } from '../hooks';

import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const user = useUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          AVN Support Tools
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            {!!user && (
              <>
                <div className="navbar-nav">
                  <NavLink className="nav-link" to="/tickets">
                    Tickets
                  </NavLink>
                  <NavLink className="nav-link" to="/projects">
                    Projects
                  </NavLink>
                  <NavLink className="nav-link" to="/new">
                    Create Ticket
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <div className="navbar-text">
            <span className="badge bg-dark">
              <h2>
                <a
                  href="https://github.com/davidespo/avn-support-tools"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-github"></i>
                </a>
              </h2>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
