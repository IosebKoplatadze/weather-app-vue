<template>
  <ul class="list-group">
    <WeatherListItem v-for="city in cities" :key="city.name" :city="city"></WeatherListItem>
  </ul>
</template>

<script>
import WeatherListItem from '@/components/weather-list-item';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WeatherList',

  async created() {
    await this.loadCities();
  },

  methods: {
    ...mapActions(['getCitiesAction']),
    async loadCities() {
      await this.getCitiesAction();
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
}
</style>
