<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <YesNo p="value" />
</template>

<script>
import YesNo from './components/YesNo.vue'

export default {
  name: 'App',
  components: {
    YesNo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: white;
  /* margin-top: 60px; */
}
</style>
