 <template>
  <div v-if="forecasts">
    <h1>{{ forecasts.name }}</h1>
    <ul class="list-group">
      <li v-for="(day, name) in forecasts.days" :key="name">
        <h2>{{ name }}</h2>
        <div v-for="forecast in day" :key="forecast.dateTime">
          <div class="body">
            <h3 class="title">{{ time(forecast) }}</h3>
            <div>{{ forecast.temp }}°</div>
            <img :src="icon(forecast)" />
            <div>{{ forecast.description }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ICON_ENDPOINT } from '@/shared/config';
import { format } from 'date-fns';

export default {
  name: 'WeatherDetail',
  props: {
    city: {
      type: String,
      default: '',
    },
  },

  async created() {
    await this.loadForecasts();
  },

  methods: {
    ...mapActions(['getForecastAction']),
    async loadForecasts() {
      await this.getForecastAction(this.city);
    },
    icon(forecast) {
      return `${ICON_ENDPOINT}/${forecast.icon}.png`;
    },
    time(forecast) {
      return format(new Date(forecast.dateTime), 'HH:mm');
    },
  },

  computed: {
    ...mapGetters(['getForecastByCity']),
    forecasts() {
      console.log(
        'TCL: forecasts -> this.getForecastByCity(this.city)',
        this.getForecastByCity(this.city),
      );
      return this.getForecastByCity(this.city);
    },
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
