import React, { useEffect, useState } from 'react';

import { useApiKey } from '../hooks';
import { useDispatch } from 'react-redux';

import Home from './Home';

const Anon = () => {
  const { initialized, loading, key, error } = useApiKey();
  const dispatch = useDispatch();
  const [newKey, setNewKey] = useState(key ?? '');
  const onValidate = () => dispatch.apikey.validateAndSetKey(newKey);
  useEffect(() => {
    if (!initialized) {
      onValidate();
    }
  }, [initialized]);

  return (
    <div>
      <div className="mb-3">
        <Home />
      </div>
      <hr className="my-3" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onValidate();
        }}
      >
        <div className="form-group mb-3">
          <label>
            Aiven Api Key (
            <a href="https://help.aiven.io/en/articles/2059201-authentication-tokens">
              help.aiven.io
            </a>
            )
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            disabled={loading}
          />
        </div>
      </form>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={onValidate}>
          Valdiate Api Key
        </button>
      </div>
      <div className="mb-3">
        {error && (
          <div className="alert alert-danger">
            <h3>There was an Error</h3>
            <p>
              <code>{error}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anon;
