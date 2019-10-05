<template>
  <div id="app" class="app-wrapper">
    <app-header></app-header>

    <main class="app-content-wrapper">
      <router-view/>

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <app-menu></app-menu>
    </main>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '@/components/app-footer.vue';
import AppHeader from '@/components/app-header.vue';
import AppMenu from '@/components/app-menu.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
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

  .app-wrapper {
    display: grid;
    grid-template-rows: 5rem auto 5rem;
    height: 100%;
  }

  .app-content-wrapper {
    padding-bottom: 5rem;
    overflow-y: scroll;
  }
</style>
