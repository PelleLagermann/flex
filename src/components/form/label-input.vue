<template>
    <label class="label-input" :class="{ 'is-valid': inputValid, 'is-invalid': !inputValid }">
        <span v-if="label" class="label-input__label">
            {{label}}
        </span>
        <input             
            v-model="inputValue"
            ref="inputField"
            class="label-input__input"
            :id="id"
            :name="name"
            :type="inputType"
            :required="required"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :min="min" 
            :max="max"
            :step="step"
            :aria-invalid="!inputValid" />
    </label>
</template>

<script>
export default {
  name: 'label-input',
  props: {
    id: String,
    name: String,
    value: String,
    label: String,
    inputType: {
      validator: function (value) {       
        return ['email', 'number', 'password', 'search', 'tel', 'text'].indexOf(value) !== -1;
      },
    },
    placeholder: String,
    required: Boolean,
    autocomplete: String,
    //Number specific
    min: [String, Number],
    max: [String, Number],
    step: [String, Number],
  },
  data() {
    return {
      inputValue: '',
      inputValid: true,
    }
  },  
  watch: {
    inputValue() {
      this.validate();
    },
    value(val) {
      this.$data.inputValue = val;
    }
  },
  methods: {
    validate() {      
      this.$data.inputValid = true;
      
      if (this.inputType === 'number' && !this.$refs.inputField.matches(':valid')) {
        this.$data.inputValid = false;
      }

      if (this.$data.inputValid) {
        this.$emit('input', this.$data.inputValue);
      } else {
        this.$emit('input', null);
      }
    }
  },
  mounted() {
    console.log("input mounted", this.value);
    this.$data.inputValue = this.value;
  },
};
</script>

<style scoped lang="scss">  
  .label-input {
    display: block;
    margin-bottom: 1rem;

    &__label {
      display: block;
      width:100%;
      font-size: 1.4rem;
    }

    &__input {
      width: 100%;
      padding: 8px 15px;
      border: 1px solid var(--neutral-7);
      border-radius: 6px;
      background-color: var(--neutral-9);
      font-size: 1.6rem;
      transition: border-color .2s ease-in-out;

      &:focus {
        border-color: var(--primary-1);
        outline: 0;
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
