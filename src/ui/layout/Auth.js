import React from 'react';

import { useUser } from '../hooks';

import Anon from '../pages/Anon';
import AuthRoutes from './AuthRoutes';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const onLogout = () => dispatch.apikey.clear();
  if (!!user) {
    return (
      <>
        <div className="clearfix">
          <div className="float-right">
            <span className="badge rounded-pill bg-info me-3">
              {user.email}
            </span>
            <button className="btn btn-sm btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
        <AuthRoutes />
      </>
    );
  }
  return <Anon />;
};

export default Auth;
