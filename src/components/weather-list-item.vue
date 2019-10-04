<template>
  <li class="list-group-item">
    <button class="btn-remove" @click="removeHandler()">X</button>
    <router-link class="link" :to="{ name: 'weather-detail', params: { city: city } }">
      <div v-if="weather" class="body">
        <h3 class="title">{{ weather.name }}</h3>
        <div>{{ weather.temp }}°</div>
        <img :src="icon" />
        <div>{{ weather.description }}</div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ICON_ENDPOINT } from '@/shared/config';

export default {
  name: 'WeatherListItem',
  props: {
    city: {
      type: String,
      default: null,
    },
  },

  async created() {
    await this.loadWeather();
  },

  methods: {
    ...mapActions(['getWeatherAction', 'deleteCityAction']),
    async loadWeather() {
      await this.getWeatherAction(this.city);
    },
    removeHandler() {
      this.deleteCityAction(this.city);
    },
  },

  computed: {
    ...mapGetters(['getWeatherByCity']),
    weather() {
      return this.getWeatherByCity(this.city);
    },
    icon() {
      return `${ICON_ENDPOINT}/${this.weather.icon}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 1.25rem;
  .link {
    text-decoration: none;
    color: black;
  }
  .body {
    padding: 1.25rem;
    min-width: 100px;

    .title {
      margin-top: 0;
    }
  }
  .btn-remove {
    position: absolute;
    width: 28px;
    height: 28px;
    right: -14px;
    top: -14px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(255, 0, 21, 0.25);
    border: 1px solid #6c757d;
  }
}
</style>
