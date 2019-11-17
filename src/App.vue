<template>
  <div id="app" class="app-wrapper">
    <app-header></app-header>

    <main class="app-content-wrapper">
      <loading-spinner v-if="loadingData"></loading-spinner>      
      <router-view v-else />
      
      <app-menu></app-menu>
    </main>

    <app-footer></app-footer>
    
    <manual-registration v-if="showAddRegistration" @close="toggleAddRegistration(false)"></manual-registration>
    <snackbar ref="snackbar"></snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import AppFooter from '@/components/app-footer.vue';
import AppHeader from '@/components/app-header.vue';
import AppMenu from '@/components/app-menu.vue';
import LoadingSpinner from '@/components/loading-spinner.vue';
import ManualRegistration from '@/components/manual-registration.vue';
import snackbar from '@/components/snackbar.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    AppMenu,
    LoadingSpinner,
    ManualRegistration,
    snackbar,
  },
  data() {
    return { };
  },
  computed: {
    ...mapState(['showAddRegistration']),
    ...mapGetters(['loadingData']),
  },
  methods: {
    ...mapMutations(['toggleAddRegistration']),
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
    overflow-y: scroll;
  }  
</style>
