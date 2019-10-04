export default {
  getWeatherByCity: state => city =>
    state.weathers.find(f => f.name.toLowerCase() === city.toLowerCase()),
  getCityByName: state => city =>
    state.cities.find(c => c.toLowerCase() === city.toLowerCase()),
};
