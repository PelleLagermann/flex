<template>
  <div class="full-page-content settings">    
    <div class="hover-box">
      <h1 class="hover-box__header">Settings</h1>

      <accordion>
        <account-settings></account-settings>
        <app-settings></app-settings>
      </accordion>      
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
import accountSettings from './_account-settings.vue';
import appSettings from './_app-settings.vue';
import accordion from '@/components/accordion/accordion.vue';

export default {
  name: 'settings',
  components: {
    accountSettings,
    appSettings,
    accordion,              
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
      submitting: {
        name: false,
        email: false,
      },            
      showConfirmLogin: false,
      confirmHandler: null,
    }
  },
  computed: {
    hoursPerWeekValue() {
      return this.$data.hoursPerWeek.value;
    },
    hoursPerWeekChanged() {      
      return this.$data.hoursPerWeek.dirty === true &&
        this.$data.hoursPerWeek.value.length > 0;
    },
    emailValue() {
      return this.$data.email.value;
    },
    emailChanged() {      
      // todo - check if email is valid
      return this.$data.email.dirty === true &&
        this.$data.email.value.length > 0 && 
        this.$data.email.value !== firebase.auth().currentUser.email;
    },    
    enableChangePassword() {            
      return this.$data.password.value.length > 0 && this.$data.password.value === this.$data.password.verifyValue;
    },
    showPasswordError() {            
      return this.$data.password.verifyValue.length > 0 && this.$data.password.value !== this.$data.password.verifyValue;
    },
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
    updateAccountSettings() {      
      
    },
    
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
  
</style>
