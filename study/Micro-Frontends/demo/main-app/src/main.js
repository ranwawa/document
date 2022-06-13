import Vue from 'vue';
import App from './App.vue';
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vueApp',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/app-vue',
  },
]);

start();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
