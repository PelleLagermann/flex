<template>
    <label class="label-input">
        <span>
            {{label}}
        </span>
        <input :required="required"
            :type="elementType"
            @keyup="eventHandler"
            :value="value"
            :autocomplete="autocomplete"
            :placeholder="placeholder"/>
    </label>
</template>

<script>
export default {
  name: 'label-input',
  props: {
    value: String,
    label: String,
    elementType: String,
    placeholder: String,
    required: Boolean,
    autocomplete: String,
  },
  methods: {
    eventHandler(event) {
      this.$emit('change', event);
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../../assets/styles/2_Tools/media-queries';

.label-input {
    span {
        font-size: 18px;
        width:100%;
    }

    input[type=input],input[type=password],input[type=number]{
        border: 1px solid #cccccc;
        padding: 8px 15px;
        border-radius: 6px;
        background-color: white;
        font-size: 18px;
        width: 100vw;
    }
}
</style>
