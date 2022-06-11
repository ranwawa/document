<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <a href="/app-vue">app-vue</a>
    <HelloWorld msg="main-app" />
    <div id="container">container</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
