<template>
  <accordion-item>
    <template slot="header">
      App settings
    </template>

    <template slot="body">
      <ul>
        <li>Vi skal kende brugerens preference for åretns første uge,
          enten ved direkte valg, eller ud fra region</li>
        <li>Decimal separator ("," eller ".")</li>
      </ul>

      <form @submit.prevent="confirmUpdateEmail" novalidate>
        <label-select
          v-model="form.language"
          :options="languageOptions"
          label="Language"
          required="required">
        </label-select>

        <label-input 
          label="E-mail"
          v-model="email.value" 
          input-type="email" 
          id="email"      
          required="required"
          placeholder="email@example.com"
          autocomplete="email">
        </label-input>

        <btn type="submit" :is-loading="email.submitting" :is-disabled="!formValuesChanged" class="btn--primary btn--full">
          Update email                
        </btn>      
      </form>
    </template>
  </accordion-item>
</template>

<script>
import { mapMutations } from 'vuex';
import accordionItem from '@/components/accordion/accordion-item.vue';
import btn from '@/components/form/btn.vue';
import labelInput from '@/components/form/label-input.vue';
import labelSelect from '@/components/form/label-select.vue';

export default {
  name: 'appSettings',
  components: {    
    accordionItem,
    btn,    
    labelInput,
    labelSelect,
  },
  data() {
    return {
      form: {
        language: 'en',
      },
      languageOptions: [
        { text: 'Choose a language', disabled: 'disabled' },
        { value: 'en', text: 'English' },
        { value: 'da', text: 'Dansk' }
      ],
      currentUser: {},
      hoursPerWeek: {
        value: '',
        dirty: false,
        submitting: false
      },
      email: {
        value: '',
        dirty: false,
        submitting: false
      },
      password: {
        value: '',
        verifyValue: '',
        dirty: false,
        submitting: false,
        errorMessage: ''
      },
      submitting: false,            
      showConfirmLogin: false,
      confirmHandler: null,
    }
  },
  computed: {
    // hoursPerWeekValue() {
    //   return this.$data.hoursPerWeek.value;
    // },
    // hoursPerWeekChanged() {      
    //   return this.$data.hoursPerWeek.dirty === true &&
    //     this.$data.hoursPerWeek.value.length > 0;
    // },
    formValuesChanged () {
      //todo
      return false;
    }
  },
  watch: {
    hoursPerWeekValue() {
      this.$data.hoursPerWeek.dirty = true;
    },
    emailValue() {
      this.$data.email.dirty = true;
    },    
  },
  methods: {
    //...mapActions('registrations', ['getRegistrations']),
    ...mapMutations(['addSnackbar']),
    registerAccordionItem(accordionItem) {
      this.$parent.register(accordionItem);      
    },
    toggleAccordionItem(toggleData) {
      this.$parent.toggle(toggleData.item, toggleData.isOpen);
    },
    updateAccountSettings() {      
      
    },
    
  },
  mounted() {
    this.$emit('mounted');
  },
};
</script>

<style lang="scss" scoped>
  
</style>

