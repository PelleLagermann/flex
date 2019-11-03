<template>
  <div class="accordion-item">
    <button type="button" class="accordion-item__header" :class="{ 'is-open': isOpen }" @click="toggle(!isOpen)">
      <slot name="header" />

      <font-awesome-icon v-if="isOpen" :icon="['fas', 'minus-circle']" class="icon" />    
      <font-awesome-icon v-else :icon="['fas', 'plus-circle']" class="icon" />    
    </button>
    <expand-transition>
      <div class="accordion-item__body" v-if="isOpen">
        <div class="accordion-item__body-inner">
          <slot name="body" />
        </div>
      </div>
    </expand-transition>  
  </div>  
</template>

<script>
  import expandTransition from '@/components/transitions/expand-transition.vue';

  export default {
    name: 'accordion-item',  
    components: {
      expandTransition,
    },
    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      toggle(show) {        
        if (show !== this.$data.isOpen) {
          this.$data.isOpen = show;
          this.$parent.toggle(this, this.isOpen);
        } 
      },    
    },
    beforeMount() {
      this.$parent.register(this);
    },
    beforeDestroy() {
      this.$parent.unregister(this._uid);
    },
  };
</script>

<style lang="scss" scoped>
  .accordion-item {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1rem 0;
      border: 0;
      border-bottom: 1px solid var(--neutral-7);
      background-color: transparent;
      font-size: 1.6rem;      

      .icon {
        transition: color .3s ease-in;
        color: var(--neutral-3);
      }

      &.is-open {
        font-weight: 700;

        .icon {
          color: var(--primary-3);
        }
      }

      &:focus {
        outline: 0;
      }
    }

    &__body {
      &-inner {
        padding: 3rem 0;
        border-bottom: 1px solid var(--neutral-7);
      }
    }
  }  
</style>
