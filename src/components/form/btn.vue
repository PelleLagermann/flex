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

    &--link {
      display: inline-block;
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;
    }
  }

</style>
