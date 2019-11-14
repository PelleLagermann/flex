<template>
  <div class="app-footer-wrapper">
    <div class="balance-wrapper">
      <div class="balance">3t 41m</div>
    </div>
    <div class="app-footer">
      <div class="app-footer__item">
        <btn v-if="currentUser" type="button" @click="toggleMenu" class="btn--clear app-footer__timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
          <span class="label">
            Start
          </span>
        </btn>
      </div>

      <div class="app-footer__item">
        <btn type="button" @click="toggleMenu" class="btn--clear app-footer__menu-toggle">
          <font-awesome-icon :icon="['fas', 'bars']" class="icon" />
        </btn>        
      </div>

      <div class="app-footer__item">
        <btn v-if="currentUser" type="button" @click="toggleAddRegistration" class="btn--clear app-footer__add-btn">
          <span class="label">
            Add
          </span>
          <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
        </btn>  
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Btn from '@/components/form/btn.vue';

export default {
  name: 'AppFooter',
  components: {
    Btn,
  },
  computed: {
    ...mapState(['currentUser', 'showAddRegistration']),
  },
  methods: {
    ...mapMutations(['toggleAddRegistration']),
    toggleMenu() {
      this.$store.commit('toggleMenu');
    },
    addRegistration() {

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/styles/2_Tools/media-queries';

  .app-footer-wrapper {
    position: relative;
  }

  .app-footer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-content: center;
    height: 100%;
    padding: .7rem 0;
    border-top: 1px solid var(--neutral-0);
    background-color: var(--neutral-3);

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        justify-content: flex-start;

        .btn {
          padding-left: 5vw;
        }        
      }

      &:last-child {
        justify-content: flex-end;
        
        .btn {
          padding-right: 5vw;
        }        
      }
    }

    &__timer-btn,
    &__add-btn {
      height: 100%;
      color: var(--neutral-9);
      font-size: 1.2rem;

      .icon {
        font-size: 2.5rem;
      }
    }

    &__timer-btn {
      .label {
        padding-left: 1rem;
      }
    }

    &__add-btn {
      .label {
        padding-right: 1rem;
      }
    }

    &__menu-toggle {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      color: var(--neutral-9);
      font-size: 3rem;

      &:active {
        //background-color: red;
      }
    }
  }

  .balance-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    pointer-events: none;
  }

  .balance {
    display: inline-block;
    padding: .5rem 2rem;
    border: 1px solid var(--neutral-0);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 0;
    background-color: var(--neutral-3);
    color: var(--neutral-9);
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: .2rem;
    transform: translate(-50%, calc(-100% + 3px))
  }

  .balance:before,
  .balance:after {
    content: " ";
    position: absolute;
    bottom: 0px;
    width: 5px;
    height: 5px;
    border: 1px solid var(--neutral-0);
  }

  .balance:before {
    left: -5px;
    border-bottom-right-radius: 6px;
    border-width: 0 1px 1px 0;
    box-shadow: 2px 2px 0 var(--neutral-3);
  }

  .balance:after {
      right: -5px;
      border-bottom-left-radius: 6px;
      border-width: 0 0 1px 1px;
      box-shadow: -2px 2px 0 var(--neutral-3);
  }
</style>
