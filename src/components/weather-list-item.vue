<template>
  <li class="list-group-item">
    <router-link class="link" :to="{ name: 'weather-detail', params: { city: city.name } }">
      <div class="body">
        <h3 class="title">{{ city.name }}</h3>
        <div>{{ city.temp }}°</div>
        <img :src="icon" />
        <div>{{ city.description }}</div>
      </div>
    </router-link>
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
<style lang="scss" scoped>
.list-group-item {
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
}
</style>
