import { GET_CITIES } from './mutation-types';

export default {
  [GET_CITIES](state, cities) {
    state.cities = cities;
  },
};
