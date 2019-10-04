import { storageService } from '../shared/storage.service';
import { getCityWeather, getCityForecast } from '../shared/data.service';
import {
  GET_CITIES,
  GET_WEATHER,
  ADD_CITY,
  DELETE_CITY,
  GET_FORECAST,
} from './mutation-types';
import { LOCAL_STORAGE_KEY } from '../shared/config';

export default {
  getCitiesAction({ commit }) {
    const cities = storageService.get(LOCAL_STORAGE_KEY);
    commit(GET_CITIES, cities || []);
  },
  async addCityAction({ commit, getters }, city) {
    city = city.toLowerCase();
    if (getters.getCityByName(city)) {
      return true;
    }
    const weather = await getCityWeather(city);
    if (!weather) {
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
  async getWeatherAction({ commit, getters }, city) {
    if (getters.getWeatherByCity(city)) {
      return;
    }
    const weather = await getCityWeather(city);
    if (weather) {
      commit(GET_WEATHER, weather);
    }
  },
  async getForecastAction({ commit, getters }, city) {
    if (getters.getForecastByCity(city)) {
      return;
    }
    const forecast = await getCityForecast(city);
    if (forecast) {
      commit(GET_FORECAST, forecast);
    }
  },
};
