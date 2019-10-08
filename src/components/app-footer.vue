<template>
  <div class="app-footer-wrapper">
    <div class="balance-wrapper">
      <div class="balance">3t 41m</div>
    </div>
    <div class="app-footer">
      <btn type="button" @click="toggleMenu" class="btn--clear app-footer__menu-toggle">
        <font-awesome-icon :icon="['fas', 'bars']" class="icon" />
      </btn>
      <div >

      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/form/btn.vue';

export default {
  name: 'AppFooter',
  components: {
    Btn,
  },
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMenu');
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: .7rem 0;
    border-top: 1px solid var(--neutral-0);
    background-color: var(--neutral-3);
  }

  .icon {
    color: var(--neutral-9);
    font-size: 3rem;
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
    font-size: 2rem;
    letter-spacing: .2rem;
    transform: translate(-50%, calc(-100% + 1px))
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
