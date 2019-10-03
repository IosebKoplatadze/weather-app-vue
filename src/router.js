import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/weathers',
    },
    {
      path: '/weathers',
      name: 'weathers-list',
      component: () =>
        import(
          /* webpackChunkName: "bundle.weathers" */ './views/weathers.vue'
        ),
    },
    {
      path: '/weathers/:city',
      name: 'weather-detail',
      component: () =>
        import(
          /* webpackChunkName: "bundle.weathers" */ './views/weather-detail.vue'
        ),
    },
    {
      path: '*',
      redirect: '/weathers',
    },
  ],
});
