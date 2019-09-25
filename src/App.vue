<template>
  <div id="app">
    <app-header></app-header>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view/>

    <app-menu></app-menu>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header.vue';
import AppMenu from '@/components/app-menu.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMenu,
  },
  data() {
    return { };
  },
  computed: {

  },
  methods: {

  },
};
</script>

<style lang="scss">
  @import 'assets/styles/styles.scss';

</style>
