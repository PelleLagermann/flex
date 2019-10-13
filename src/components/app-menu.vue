<template>

    <div class="app-menu-wrapper" :class="{ 'is-open': menuOpen, 'is-closed': !menuOpen }">
      <ul class="app-menu" @click="closeMenu($event)">
        <li v-if="!currentUser" class="app-menu__item">
          <router-link to="/sign-in" class="app-menu__link">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="icon" />
            Sign in
          </router-link>
        </li>
        <li v-if="currentUser" class="app-menu__item">
          <router-link to="/home" class="app-menu__link">
            <font-awesome-icon :icon="['fas', 'home']" class="icon" />
            Home
          </router-link>
        </li>
        <li v-if="currentUser" class="app-menu__item">
          <router-link to="/profile" class="app-menu__link">
            <font-awesome-icon :icon="['fas', 'user-cog']" class="icon" />
            Profile
          </router-link>
        </li>
        <li v-if="currentUser" class="app-menu__item">
          <router-link to="/settings" class="app-menu__link">
            <font-awesome-icon :icon="['fas', 'cog']" class="icon" />
            Settings
          </router-link>
        </li>
        <li class="app-menu__item">
          <router-link to="/about" class="app-menu__link">
            <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="icon" />
            About
          </router-link>
        </li>
        <li v-if="currentUser" class="app-menu__item">
          <btn @click.prevent="signOut" class="btn--clear app-menu__link sign-out-btn">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" />
            Sign out
          </btn>
        </li>
      </ul>

      <div class="app-menu__close-wrapper">
        <btn type="button" @click.prevent="$store.commit('toggleMenu')"
          class="btn--clear app-menu__close-btn">
          <font-awesome-icon :icon="['fas', 'times']" class="icon" />
        </btn>
      </div>
    </div>

</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';
import Btn from '@/components/form/btn.vue';

export default {
  name: 'AppMenu',
  components: {
    Btn,
  },
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

<style scoped lang="scss">
  .app-menu-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--neutral-3);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity .5s ease-out;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 200vmax;
      height: 200vmax;
      border-radius: 50%;
      background-color: var(--neutral-3);
      overflow: hidden;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    &.is-open {
      animation-name: openMenu;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
      z-index: 1;
    }

    &.is-closed {
      animation-name: closeMenu;
      animation-duration: .5s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
      z-index: 1;
    }

    &.is-open {
      opacity: 1;
      transition-delay: 1s;
    }

    &.is-closed {
      opacity: 1;
    }
  }

  .app-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    margin: 0;
    padding: 0;
    font-size: 3rem;
    list-style-type: none;

    &__item {
      font-family: var(--font-header);
      font-weight: 900;

      &+ .app-menu__item {
        margin-top: 1em;
      }
    }

    &__link {
      color: var(--neutral-9);
      text-transform: uppercase;
      text-decoration: none;

      .icon {
        margin-right: .5em;
      }
    }

    .sign-out-btn {
      margin-top: 3em;
      font-size: 2rem;

      .icon {
        font-size: 1em;
      }
    }

    &__close-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &__close-btn {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;

      .icon {
        color: var(--neutral-9);
        font-size: 3rem;
      }
    }
  }

  .icon {
    color: var(--neutral-9);
    font-size: 3rem;
  }

  @keyframes openMenu {
    0% {
      transform: translate(-50%, 0) scale(.05);
    }
    55% {
      transform: translate(-50%, -60%) scale(.05);
    }
    70% {
      transform: translate(-50%, -50%) scale(.05);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes closeMenu {
    from {
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(0);
    }
  }
</style>
