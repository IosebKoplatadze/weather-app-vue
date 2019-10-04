<template>
  <ul class="list-group">
    <WeatherListItem v-for="city in cities" :key="city" :city="city"></WeatherListItem>
  </ul>
</template>

<script>
import WeatherListItem from '@/components/weather-list-item';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WeatherList',

  created() {
    this.loadCities();
  },

  methods: {
    ...mapActions(['getCitiesAction']),
    loadCities() {
      this.getCitiesAction();
    },
  },

  computed: {
    ...mapState(['cities']),
  },

  components: {
    WeatherListItem,
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  display: flex;
  justify-content: center;
  padding: 0;
  flex-wrap: wrap;
}
</style>
