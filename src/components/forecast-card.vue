<template>
  <div class="card">
    <h2>{{ date }}</h2>
    <ul class="list-group">
      <li class="list-item" v-for="forecast in day" :key="forecast.dateTime">
        <h3 class="title">{{ time(forecast) }}</h3>
        <img :src="icon(forecast)" />
        <div style="text-align: end; line-height: 1.5rem;">
          <div>{{ forecast.description }}</div>
          <div>{{ forecast.temp }}°</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { ICON_ENDPOINT } from '@/shared/config';

export default {
  name: 'ForecastCard',
  props: {
    date: {
      type: String,
      default: null,
    },
    day: {
      type: Array,
      default: null,
    },
  },
  methods: {
    icon(forecast) {
      return `${ICON_ENDPOINT}/${forecast.icon}.png`;
    },
    time(forecast) {
      return format(new Date(forecast.dateTime), 'HH:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 1.25rem;
  height: 100%;
  min-width: 300px;
  .list-group {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    .list-item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 0.125);
    }
  }
}
</style>