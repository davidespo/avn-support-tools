import _ from 'lodash';
import axios from 'axios';
import store from '../rdx/store';

const call = (key) => {
  const headers = {
    authorization: `aivenv1 ${key}`,
  };
  return (req) => {
    const request = _.merge({}, req, { headers });
    return axios(request);
  };
};

function isValid(apikey) {
  const { initialized, loading, key, user, error } = apikey;
  return initialized && !loading && !!key && !!user && !error;
}

export class AivenApi {
  static async listSupportTickets(projectName = 'business-demo') {
    const apikey = store.getState().apikey;
    if (isValid(apikey)) {
      const { key } = apikey;
      try {
        const res = await call(key)({
          url: `https://api.aiven.io/v1/project/${projectName}/tickets`,
        });
        return res.data?.tickets ?? [];
      } catch (error) {
        if (error.message.includes('code 403')) {
          console.log(
            `Project "${projectName}" does not have support feature enabled.`,
          );
        } else {
          console.error(error.message);
        }
      }
    }
    return [];
  }

  static async validateKey(key) {
    try {
      const res = await call(key)({ url: 'https://api.aiven.io/v1/me' });
      const {
        projects,
        real_name: name,
        user: email,
      } = _.get(res, 'data.user', {});
      const user = { projects, name, email };
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
