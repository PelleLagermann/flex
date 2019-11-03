<template>  
  <div v-if="snackbars.length > 0" class="snackbar-wrapper">
    <transition-group name="list" tag="div">
      <div v-for="snackbar in snackbars" v-bind:key="snackbar.key" class="snackbar" :class="'snackbar--' + snackbar.type">
        <div class="snackbar__content">
          {{snackbar.message}}
        </div>
      </div>
    </transition-group>    
  </div>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  name: 'Snackbar',    
  props: {    
    duration: {
      type: Number,
      default: 4000
    },    
  },
  data() {
    return {            
      
    };
  },
  computed: {
    ...mapState(['snackbars']),    
  },   
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/2_Tools/media-queries';
  @import '../assets/styles/4_Base/box-shadows';

  .snackbar-wrapper {
    position: fixed;
    bottom: 5.5rem;
    left: 2vw;
    z-index: 9999;
  }

  .snackbar {
    width: 96vw;
    margin: .5rem 0;
    border-radius: 6px;

    &__content {
      padding: 1rem;
    }

    &--info {
      @include box-shadow-xs('--neutral-4-base');
      background-color: var(--neutral-4);
      color: var(--neutral-9);
    }

    &--error {
      @include box-shadow-xs('--error-3-base');
      background-color: var(--error-3);
      color: var(--neutral-9);
    }

    &--warning {
      @include box-shadow-xs('--warning-5-base');
      background-color: var(--warning-5);
      color: var(--neutral-2);
    }

    &--success {
      @include box-shadow-xs('--success-2-base');
      background-color: var(--success-2);
      color: var(--neutral-9);
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
