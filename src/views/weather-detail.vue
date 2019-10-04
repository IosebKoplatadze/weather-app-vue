 <template>
  <div v-if="forecasts">
    <h1>{{ forecasts.name }}</h1>
    <div class="container">
      <ForecastCard v-for="(day, date) in forecasts.days" :key="date" :day="day" :date="date"></ForecastCard>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ForecastCard from '@/components/forecast-card';

export default {
  name: 'WeatherDetail',
  props: {
    city: {
      type: String,
      default: '',
    },
  },

  created() {
    this.getForecastAction(this.city);
  },

  methods: {
    ...mapActions(['getForecastAction']),
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
  components: {
    ForecastCard,
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
</style>
