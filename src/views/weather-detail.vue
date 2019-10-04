 <template>
  <div v-if="forecasts">
    <h1>{{ forecasts.name }}</h1>
    <div class="container">
      <div class="card" v-for="(day, date) in forecasts.days" :key="date">
        <h2>{{ date }}</h2>
        <ul class="list-group">
          <li class="list-item" v-for="forecast in day" :key="forecast.dateTime">
            <h3 class="title">{{ time(forecast) }}</h3>
            <img :src="icon(forecast)" />
            <div>
              <div>{{ forecast.temp }}°</div>
              <div>{{ forecast.description }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
.container {
  display: flex;
  justify-content: center;
  padding: 0;
  flex-wrap: wrap;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 1.25rem;
  height: 100%;
  min-width: 300px;
}
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
</style>
