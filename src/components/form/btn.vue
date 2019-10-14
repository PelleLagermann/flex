<template>
  <component
    :is="elem"
    class="btn"
    :href="href"
    @click="clickHandler"
    v-ripple>
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'btn',
  props: {
    href: String,
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

  .btn {
    display: inline-block;
    padding: .5em 1em;
    border: 0;
    border-radius: 6px;
    font-size: 1.6rem;
    text-align: center;

    &--primary {
      background-color: var(--primary-1);
      color: var(--neutral-9);
    }

    &--secondary {
      background-color: var(--secondary-4);
      color: var(--neutral-9);
    }

    &--neutral {
      background-color: var(--neutral-4);
      color: var(--neutral-9);
    }

    &--error {
      background-color: var(--error-3);
      color: var(--neutral-9);
    }

    &--warning {
      background-color: var(--warning-5);
      color: var(--neutral-2);
    }

    &--success {
      background-color: var(--success-2);
      color: var(--neutral-9);
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
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;
    }
  }

</style>
