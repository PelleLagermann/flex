<template>  
  <accordion-item @register="registerAccordionItem" @toggle="toggleAccordionItem">
    <template slot="header">
      Account settings
    </template>

    <template slot="body">
      <ul>
        <li>Hours per week: collection af { fromDate: '2019-01-01', hoursPerWeek: 37 }</li>
        <li>Skal vi håndterer at timer efter kl.xx:xx eller timer lagt i weekend måske tæller mere end 1/1?</li>
        <li></li>
      </ul>

      <form @submit.prevent="updateAccountSettings" novalidate>              
        <label-input 
          label="Hours per week"
          v-model="hoursPerWeek.value"         
          id="hoursPerWeek"
          input-type="number"
          required="required"
          placeholder="37.5"
          min="0"
          max="168"
          step="1">
        </label-input>

        <btn type="submit" :is-loading="submitting" :is-disabled="!formValuesChanged" class="btn--primary btn--full">
          Update name                
        </btn>      
      </form>
    </template>
  </accordion-item>  
</template>

<script>
//import firebase from 'firebase';
import { mapMutations } from 'vuex';
import accordionItem from '@/components/accordion/accordion-item.vue';
import btn from '@/components/form/btn.vue';
import labelInput from '@/components/form/label-input.vue';

export default {
  name: 'accountSettings',
  components: {    
    accordionItem,
    btn,    
    labelInput,        
  },
  data() {
    return {
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
