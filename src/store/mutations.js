import {
  GET_CITIES,
  GET_WEATHER,
  ADD_CITY,
  DELETE_CITY,
  GET_FORECAST,
} from './mutation-types';
import { uniqBy } from 'lodash';

export default {
  [GET_CITIES](state, cities) {
    state.cities = cities;
  },
  [ADD_CITY](state, city) {
    state.cities.push(city);
  },
  [DELETE_CITY](state, city) {
    state.cities = [...state.cities.filter(c => c !== city)];
  },
  [GET_WEATHER](state, weather) {
    state.weathers = uniqBy([weather, ...state.weathers], 'name');
  },
  [GET_FORECAST](state, forecast) {
    state.forecasts = uniqBy([forecast, ...state.forecasts], 'name');
  },
};
