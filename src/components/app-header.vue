<template>
  <div class="app-header-wrapper">
    <div class="container app-header">
      <router-link to="/">
        <font-awesome-icon :icon="['far', 'clock']" class="icon header-logo" />
      </router-link>

      <div class="week-status">
        <div class="week-status__registered">19.57</div>
        <font-awesome-icon :icon="['fas', 'slash']" class="icon week-status__separator" />
        <div class="week-status__target">37.5</div>
      </div>

      <router-link to="/overview" class="overview-link">
        <span class="current-week">
          <span class="current-week__title">
            Uge
          </span>
          <span class="current-week__number">
            37
          </span>
        </span>
        <font-awesome-icon :icon="['far', 'calendar-alt']" class="icon overview-link__icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'AppHeader',
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
  @import '../assets/styles/2_Tools/media-queries';

  .app-header-wrapper {
    background-color: var(--neutral-0);
  }

  .icon {
    color: #fff;
  }

  @include bp-sm-max {
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .header-logo {
      margin: 1rem 0;
      color: var(--primary-6);
      font-size: 2.5rem;
    }

    .week-status {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 300;

      &__registered {
        position: relative;
        top: -.5rem;
        font-size: 1.4rem;
      }

      &__target {
        position: relative;
        bottom: -.5rem;
        font-size: 1.4rem;
      }

      &__separator {
        font-size: 2rem;
        transform: scaleX(-1);
      }
    }

    .overview-link {
      display: flex;
      color: var(--neutral-8);
      text-decoration: none;

      &__icon {
        margin: 1rem 0;
        color: currentColor;
        font-size: 2.5rem;
      }

      .current-week {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;

        &__title {
          font-size: 1.1rem;
          font-weight: 300;
        }

        &__number {
          font-size: 1.6rem;
          font-weight: 400;
        }
      }
    }
  }
</style>
