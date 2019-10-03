<template>
  <ul>
    <WeatherListItem v-for="city in cities" :key="city.name" :city="city"></WeatherListItem>
  </ul>
</template>

<script>
import { getCityWeather } from '@/shared/data.service';
import WeatherListItem from '@/components/weather-list-item';
export default {
  name: 'WeatherList',
  data() {
    return {
      cities: null,
    };
  },
  async created() {
    await this.loadCities();
  },
  methods: {
    async loadCities() {
      const london = await getCityWeather('London');
      this.cities = [london];
    },
  },
  components: {
    WeatherListItem,
  },
};
</script>
