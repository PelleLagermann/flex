<template>
    <label class="label-input">
        <span v-if="label" class="label-input__label">
            {{label}}
        </span>
        <input 
            class="label-input__input"
            v-model="inputValue"
            @input="eventHandler"
            :id="id"
            :name="name"
            :type="inputType"
            :required="required"
            :autocomplete="autocomplete"
            :placeholder="placeholder"/>
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
    inputType: String,
    placeholder: String,
    required: Boolean,
    autocomplete: String,
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    eventHandler() {
      this.$emit('input', this.$data.inputValue);
    },
  },
  mounted() {
    this.$data.inputValue = this.value;
  },
};
</script>

<style scoped lang="scss">
  @import '../../assets/styles/2_Tools/media-queries';

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
}
</style>
