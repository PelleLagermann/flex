<template>
    <label class="label-select">
        <span v-if="label" class="label-select__label">
            {{label}}
        </span>
        <select 
          v-model="inputValue"
          class="label-select__input"
          :id="id"
          :name="name"
          :required="required">
          
          <!-- todo - support for <optgroup label="xyz"></optgroup>           -->
          <option 
            v-for="(option, index) in options" 
            :value="option.value" 
            :key="index"
            :disabled="option.disabled">
            {{option.text}}            
          </option>
        </select>        
    </label>
</template>

<script>
export default {
  name: 'label-select',
  props: {
    id: String,
    name: String,
    value: String,
    label: String,        
    required: Boolean,    
    //Select specific
    options: Array,
    multiple: Boolean,    
  },
  data() {
    return {
      inputValue: '',      
    }
  },  
  watch: {
    inputValue() {
      this.$emit('input', this.$data.inputValue);
    },    
  },  
  mounted() {    
    this.$data.inputValue = this.value;
  },
};
</script>

<style scoped lang="scss">
.label-select {
  display: block;
  margin-bottom: 1rem;

  &__label {
    display: block;
    width:100%;
    font-size: 1.4rem;
  }

  &__input {
    display: block;

    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    margin: 0;
    padding: 8px 15px;
    border: 1px solid var(--neutral-7);
    border-radius: 6px;
    background-color: var(--neutral-9);
    font-size: 1.6rem;
    line-height: 1.3;    
    transition: border-color .2s ease-in-out;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; 
    
    /* 
      The bg image below is an svg data uri for the arrow icon. 
      If you want to change the color, replace the color after `%23`
    */
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23606d7b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right .7em top 50%;
    /* icon size, then gradient */
    background-size: .65em auto;

    &:focus {
      border-color: var(--primary-1);
      outline: 0;
    }      

    ::-ms-expand {
      display: none;
    }
  }

  &.is-invalid {
    .label-input__label {      
      color: var(--error-2);
    }

    .label-input__input {      
      outline: 1px solid var(--error-4);
    }    
  }  
}
</style>
