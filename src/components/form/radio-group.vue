<template>
<div class="radio-group">
  <div v-for="(option, index) in options" :key="index">
    <input type="radio" v-model="inputValue" :id="`rg-${_uid}-${index}`" :name="name" :value="option.value">
    <label :for="`rg-${_uid}-${index}`">
      {{option.text}}
    </label>
  </div>
</div>
      
</template>

<script>
export default {
  name: 'radio-group',
  props: {
    id: String,
    name: String,            
    value: String,
    required: Boolean,
    options: Array,    
  },
  data() {
    return {
      inputValue: '',      
    }
  },  
  watch: {
    inputValue() {
      console.log("emitting", this.$data.inputValue);
      this.$emit('input', this.$data.inputValue);
    },    
  },  
  mounted() {    
    this.$data.inputValue = this.value;
  },
};
</script>

<style scoped lang="scss">
.radio-group {
  
}
</style>
