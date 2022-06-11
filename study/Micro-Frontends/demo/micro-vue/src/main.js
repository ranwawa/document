import '../public-path';
import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

let instance = null;

Vue.config.productionTip = false;

function render(props = {}) {
  const { container } = props;
  const router = new Router({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue' : '/',
    mode: 'history',
    routes: [{ path: '/', component: App }],
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstrapped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
