import { getCityWeather } from '../shared/data.service';
import { GET_CITIES } from './mutation-types';

export default {
  async getCitiesAction({ commit }) {
    const cities = await getCityWeather('London');
    commit(GET_CITIES, [cities]);
  },
};
