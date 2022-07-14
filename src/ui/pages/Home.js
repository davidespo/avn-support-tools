import React from 'react';

import security from './security.png';

const Home = ({ showSecurity }) => {
  return (
    <div>
      <p>
        This site is <b>NOT</b> officially supported by Aiven.
      </p>
      <p>
        This tooling was created by an Aiven employee to show the power of API's
        while solving the real world pain of managing support tickets across
        multiple projects.
      </p>
      {showSecurity && (
        <>
          <p>Use this project at your own risk.</p>
          <div>
            <img src={security} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
