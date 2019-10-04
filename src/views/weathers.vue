<template>
  <div>
    <AddCity></AddCity>
    <WeatherList></WeatherList>
  </div>
</template>

<script>
import WeatherList from '@/components/weather-list';
import AddCity from '@/components/add-city';

export default {
  name: 'Weathers',
  components: {
    WeatherList,
    AddCity,
  },
};
</script>
