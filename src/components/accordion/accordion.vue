<template>
  <div class="accordion" role="presentation">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'accordion',    
  props: {    
    multiple: {
      type: Boolean,
      default: false
    },
    toggleFirst: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    register(item) {
      this.$data.items.push(item);
      
      if (this.$data.items.length === 1 && this.toggleFirst) {
        item.toggle(true);
      }
    },
    unregister() {//itemId
      //unregister item
    },
    toggle(toggleItem, show) {      
      if (!this.multiple && show) {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          if (item._uid !== toggleItem._uid) {
            item.toggle(false);
          }
        }
      }      
    },
  },  
};
</script>

<style lang="scss" scoped>
  
</style>
