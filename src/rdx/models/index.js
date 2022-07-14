import { AivenApi } from '../../services/avn';

export const apikey = {
  state: {
    initialized: false,
    loading: false,
    key: null,
    user: null,
    error: null,
  },
  reducers: {
    clear() {
      return {
        initialized: false,
        key: null,
        user: null,
        error: null,
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        loading: payload,
      };
    },
    onSuccess(state, payload) {
      const { key, user } = payload;
      return {
        ...state,
        initialized: true,
        loading: false,
        key,
        user,
        error: null,
      };
    },
    onError(state, payload) {
      return {
        ...state,
        initialized: false,
        loading: false,
        key: null,
        user: null,
        error: payload,
      };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async validateAndSetKey(payload, rootState) {
      const key = payload;
      if (!rootState.apikey.loading || !!key) {
        dispatch.apikey.setLoading(true);
        try {
          const user = await AivenApi.validateKey(key);
          dispatch.apikey.onSuccess({ key, user });
        } catch (error) {
          console.log(error);
          dispatch.apikey.onError(error.message);
        }
      }
    },
  }),
};
