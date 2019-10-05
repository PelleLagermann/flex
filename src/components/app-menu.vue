<template>
  <div class="app-menu" :class="{ 'is-open': menuOpen }">
    <h1>menu her...</h1>
    <h2>Lav lækker anim med keyframes</h2>
    <button @click.prevent="signOut">Sign out</button>
    <button @click.prevent="$store.commit('toggleMenu')">Close</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  name: 'AppMenu',
  computed: {
    ...mapState(['menuOpen']),
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('sign-in');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .app-menu {
    --transition-timer: .7s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 50%;//50% 50% 0 0
    background-color: var(--neutral-5);
    opacity: 0;
    z-index: 1;
    transform: translateY(100%);
    transition: border-radius .5s ease-in-out,
                opacity var(--transition-timer) ease-in-out,
                transform var(--transition-timer) ease-in-out;

    &.is-open {
      border-radius: 0;
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
