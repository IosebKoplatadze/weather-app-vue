export default {
  getForecastByCity: state => city =>
    state.forecasts.find(f => f.name.toLowerCase() === city.toLowerCase()),
  getCityByName: state => city =>
    state.cities.find(c => c.toLowerCase() === city.toLowerCase()),
};
