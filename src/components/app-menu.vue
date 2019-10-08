<template>
  <div class="app-menu-wrapper" :class="{ 'is-open': menuOpen }">
    <h1>menu her...</h1>
    <h2>Lav lækker anim med keyframes</h2>

    <ul class="app-menu" @click="closeMenu($event)">
      <li v-if="!currentUser" class="app-menu__item">
        <router-link to="/sign-in" class="app-menu__link">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
          Sign in
        </router-link>
      </li>
      <li v-if="currentUser" class="app-menu__item">
        <router-link to="/profile" class="app-menu__link">
          <font-awesome-icon :icon="['fas', 'user-cog']" />
          Profile
        </router-link>
      </li>
      <li v-if="currentUser" class="app-menu__item">
        <router-link to="/settings" class="app-menu__link">
          <font-awesome-icon :icon="['fas', 'cog']" />
          Settings
        </router-link>
      </li>
      <li v-if="currentUser" class="app-menu__item">
        <router-link to="/about" class="app-menu__link">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
          About
        </router-link>
      </li>
      <li v-if="currentUser" class="app-menu__item">
        <button class="app-menu__link" @click.prevent="signOut">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          Sign out
        </button>
      </li>
    </ul>


    <button @click.prevent="$store.commit('toggleMenu')">Close</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  name: 'AppMenu',
  data() {
    return {
      currentUser: firebase.auth().currentUser,
    };
  },
  computed: {
    ...mapState(['menuOpen']),
  },
  methods: {
    closeMenu(event) {
      if (event.target.closest('.app-menu__link')) {
        this.$store.commit('toggleMenu', { forceClose: true });
      }
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('sign-in');
      });
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$data.currentUser = user;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .app-menu-wrapper {
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

  .app-menu {
    font-size: 3rem;

    &__item {

    }

    &__link {
      color: var(--neutral-9);
    }
  }
</style>
