<template>
  <component
    :is="elem"
    class="btn"
    :class="{ 'is-disabled': isDisabled }"
    :href="href"
    @click="clickHandler"
    v-ripple="false">
    <slot></slot>
    <slot v-if="!isLoading" name="icon"></slot>
    <font-awesome-icon v-else :icon="['fas', 'spinner']" class="icon btn__spinner" /> 
  </component>
</template>

<script>
export default {
  name: 'btn',
  props: {
    href: String,
    isLoading: Boolean,
    isDisabled: Boolean
  },
  computed: {
    elem() {
      return this.href ? 'a' : 'button';
    },
  },
  methods: {
    clickHandler(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/styles/2_Tools/media-queries';
  @import '../../assets/styles/4_Base/box-shadows';

  .btn {
    display: inline-block;
    margin-top: 2rem;    
    padding: .5em 1em;
    border: 0;
    border-radius: 6px;
    font-size: 1.6rem;
    text-align: center;
    text-decoration: none;
    transition: box-shadow .2s ease-in-out;    

    .icon {
      margin-left: 1rem;
    }

    &__spinner {
      animation: rotate 1s infinite linear;
    }    

    /* SIZE VARIANTS */ 
    &--full {
      width: 100%;
    }

    /* COLOR VARIANTS */ 
    &--primary {
      @include box-shadow-xs('--primary-1-base');
      background-color: var(--primary-1);
      color: var(--neutral-9);
    }

    &--secondary {
      @include box-shadow-xs('--secondary-4-base');
      background-color: var(--secondary-4);
      color: var(--neutral-9);
    }

    &--neutral {
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

    /* STATES */
    &:active:not(:disabled):not(.is-disabled) {
      box-shadow: 0 0 0 0 rgba(0,0,0,0.5),
        0 0 0 0 rgba(0,0,0,0.4),
        0 0 0 0 rgba(0,0,0,0.3),
        0 0 0 0 var(--box-shadow-tint);        
    }

    &:focus {
      outline: 0;
    }

    &:disabled,
    &.is-disabled {
      background-color: var(--neutral-7);
      color: var(--neutral-2);
      cursor: not-allowed;

      /deep/ .ripple-container {
        display: none;
      }
    }

    &--clear {
      display: inline-block;
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;

      &:focus {
        outline: 0;
      }
    }

    &--link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0;
      border: 0;
      background-color: transparent;
      text-decoration: underline;
    }
  }

  @keyframes rotate {
		from {
				transform: rotate(0deg);
		}
		to {
				transform: rotate(359deg);
		}
  }
</style>
