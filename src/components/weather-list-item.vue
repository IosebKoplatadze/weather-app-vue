<template>
  <li>
    <h3>{{city.name}}</h3>
    <img :src="icon" />
    <div>{{city.temp}}°</div>
    <div>{{city.description}}</div>
  </li>
</template>


<script>
import { ICON_ENDPOINT } from '@/shared/config';
export default {
  name: 'WeatherListItem',
  props: {
    city: {
      type: Object,
      default: null,
    },
  },
  computed: {
    icon() {
      return `${ICON_ENDPOINT}/${this.city.icon}.png`;
    },
  },
};
</script>
