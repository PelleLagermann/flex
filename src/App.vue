<template>
  <div id="app" class="app-wrapper">
    <app-header></app-header>

    <main class="app-content-wrapper">
      <router-view/>

      <app-menu></app-menu>
    </main>

    <app-footer></app-footer>
    <snackbar ref="snackbar"></snackbar>
  </div>
</template>

<script>
import AppFooter from '@/components/app-footer.vue';
import AppHeader from '@/components/app-header.vue';
import AppMenu from '@/components/app-menu.vue';
import snackbar from '@/components/snackbar.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    AppMenu,
    snackbar,
  },
  data() {
    return { };
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    
  }
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
