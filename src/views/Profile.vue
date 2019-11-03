<template>
  <div class="full-page-content sign-in">
    <div class="hover-box">
      <h1 class="hover-box__header">PROFILE</h1>

      <accordion>
        <accordion-item>
          <template slot="header">
            Name
          </template>

          <template slot="body">
            <form @submit.prevent="updateName" novalidate>              
              <label-input 
                label="Name"
                v-model="displayName.value"         
                id="name"      
                required="required"
                placeholder="Boaty McBoatface"
                autocomplete="name">
              </label-input>

              <btn type="submit" :is-loading="displayName.submitting" :is-disabled="!nameChanged" class="btn--primary btn--full">
                Update name                
              </btn>      
            </form>
          </template>
        </accordion-item>  

        <accordion-item>
          <template slot="header">
            Email
          </template>

          <template slot="body">
            <form @submit.prevent="confirmUpdateEmail" novalidate>
              <label-input 
                label="E-mail"
                v-model="email.value" 
                input-type="email" 
                id="email"      
                required="required"
                placeholder="email@example.com"
                autocomplete="email">
              </label-input>

              <btn type="submit" :is-loading="email.submitting" :is-disabled="!emailChanged" class="btn--primary btn--full">
                Update email                
              </btn>      
            </form>
          </template>
        </accordion-item>

        <accordion-item>
          <template slot="header">
            Change password
          </template>

          <template slot="body">
            <form @submit.prevent="confirmChangePassword" novalidate>
              Change password

              <label-input 
                label="New password"
                v-model="password.value" 
                input-type="password" 
                id="password"
                required="required"
                placeholder="••••••••••">
              </label-input>    

              <label-input 
                label="Confirm new password"
                v-model="password.verifyValue" 
                input-type="password" 
                id="passwordVerify"
                required="required"
                placeholder="••••••••••">
              </label-input>
              
              <div v-if="showPasswordError" class="error-message">The entered passwords don't match</div>
              <div v-if="password.errorMessage" class="error-message">{{password.errorMessage}}</div>

              <btn type="submit" :is-loading="password.submitting" :is-disabled="!enableChangePassword" class="btn--primary btn--full">
                Change password
              </btn>
            </form>
          </template>
        </accordion-item>

        <accordion-item>
          <template slot="header">
            Danger zone
          </template>

          <template slot="body">
            <form @submit.prevent="updateProfile" novalidate>
              <ul>
                <li>Slet bruger</li>
              </ul>
              <br><br><br><br><br><br><br><br><br><br><br><br>
            </form>
          </template>
        </accordion-item>
      </accordion>      
    </div>

    <confirm-login v-if="showConfirmLogin" @close="showConfirmLogin = false" @confirmed="confirmHandler"></confirm-login>      
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
import accordion from '@/components/accordion/accordion.vue';
import accordionItem from '@/components/accordion/accordion-item.vue';
import btn from '@/components/form/btn.vue';
import ConfirmLogin from '@/components/confirm-login.vue';
import labelInput from '@/components/form/label-input.vue';

export default {
  name: 'profile',
  components: {
    accordion,
    accordionItem,
    btn,
    ConfirmLogin,
    labelInput,        
  },
  data() {
    return {
      currentUser: {},
      displayName: {
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
    nameValue() {
      return this.$data.displayName.value;
    },
    nameChanged() {      
      return this.$data.displayName.dirty === true &&
        this.$data.displayName.value.length > 0 && 
        this.$data.displayName.value !== firebase.auth().currentUser.displayName;
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
    nameValue() {
      this.$data.displayName.dirty = true;
    },
    emailValue() {
      this.$data.email.dirty = true;
    },    
  },
  methods: {
    //...mapActions('registrations', ['getRegistrations']),
    ...mapMutations(['addSnackbar']),
    updateName() {      
      const self = this;
      if (self.nameChanged) {
        self.$data.displayName.submitting = true;

        firebase.auth().currentUser.updateProfile({
          displayName: self.$data.displayName.value
        }).then(function() {                   
          self.addSnackbar({
            message: 'Username updated',
            //action: '...',
            //handler. function() { ... },
            type: 'success'
          }); 

          self.$data.displayName.dirty = false;
        }).catch(function(error) {
          self.addSnackbar({
            message: 'Update name failed',            
            type: 'error'
          });
          console.error('Error updating name', error);
        }).finally(function () {
          self.$data.displayName.submitting = false;
        });
      }
    },
    confirmUpdateEmail() {      
      if (this.emailChanged) {
        this.$data.confirmHandler = this.updateEmail;
        this.$data.showConfirmLogin = true;
      }
    },
    updateEmail() {      
      const self = this;
      if (self.emailChanged) {
        self.$data.email.submitting = true;

        firebase.auth().currentUser.updateEmail(self.$data.email.value)
        .then(function() {
          self.addSnackbar({
            message: 'Email updated',            
            type: 'success'
          });
          self.$data.email.dirty = false;
        }).catch(function() {
          self.addSnackbar({
            message: 'Update email failed',            
            type: 'error'
          });          
        }).finally(function () {
          self.$data.email.submitting = false;
        });
      }
    },
    confirmChangePassword() {      
      if (this.enableChangePassword) {
        this.$data.confirmHandler = this.changePassword;
        this.$data.showConfirmLogin = true;
      }
    },
    changePassword() {
      const self = this;

      if (this.enableChangePassword) {
        self.$data.password.errorMessage = '';
        self.$data.password.submitting = true;
        
        firebase.auth().currentUser.updatePassword(this.$data.password.value)
        .then(function() {
          self.$data.password.value = '';
          self.$data.password.verifyValue = '';

          self.addSnackbar({
            message: 'Password changed',            
            type: 'success'
          });
        }).catch(function(error) {          
          if (error.code === 'auth/weak-password') {
            self.$data.password.errorMessage = error.message;
          } else {
            self.addSnackbar({
              message: 'Change password failed',            
              type: 'error'
            });
          }          
        }).finally(function () {
          self.$data.password.submitting = false;
        });
      }        
    },
  },
  mounted() {
    const user = firebase.auth().currentUser;
    this.$data.displayName.value = user.displayName || '';
    this.$data.email.value = user.email;
    // Object.assign(this.$data.profile, {
    //   name: user.displayName || '',
    //   email: user.email,
    // });    
  },
};
</script>

<style lang="scss" scoped>
  
</style>
