import { storageService } from '../shared/storage.service';
import { getCityWeather } from '../shared/data.service';
import {
  GET_CITIES,
  GET_FORECAST,
  ADD_CITY,
  DELETE_CITY,
} from './mutation-types';
import { LOCAL_STORAGE_KEY } from '../shared/config';

export default {
  getCitiesAction({ commit }) {
    const cities = storageService.get(LOCAL_STORAGE_KEY);
    commit(GET_CITIES, cities);
  },
  async addCityAction({ commit, getters }, city) {
    city = city.toLowerCase();
    if (getters.getCityByName(city)) {
      return true;
    }
    const forecast = await getCityWeather(city);
    if (!forecast) {
      return false;
    }

    const oldCities = storageService.get(LOCAL_STORAGE_KEY);
    const newCities = oldCities ? [...oldCities, city] : [city];
    const result = storageService.set(LOCAL_STORAGE_KEY, newCities);
    if (result) {
      commit(ADD_CITY, city);
    }
    return true;
  },
  deleteCityAction({ commit, getters }, city) {
    city = city.toLowerCase();
    if (!getters.getCityByName(city)) {
      return;
    }
    const oldCities = storageService.get(LOCAL_STORAGE_KEY);
    const newCities = oldCities.filter(c => c !== city);
    const result = storageService.set(LOCAL_STORAGE_KEY, newCities);
    if (result) {
      commit(DELETE_CITY, city);
    }
  },
  async getForecastAction({ commit }, city) {
    const forecast = await getCityWeather(city);
    if (forecast) {
      commit(GET_FORECAST, forecast);
    }
  },
};
