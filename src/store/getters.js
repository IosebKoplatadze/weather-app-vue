export default {
  getWeatherByCity: state => city =>
    state.weathers.find(w => w.name.toLowerCase() === city.toLowerCase()),
  getCityByName: state => city =>
    state.cities.find(c => c.toLowerCase() === city.toLowerCase()),
  getForecastByCity: state => city =>
    state.forecasts.find(f => f.name.toLowerCase() === city.toLowerCase()), //todo
};
