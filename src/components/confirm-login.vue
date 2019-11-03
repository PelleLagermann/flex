<template>  
    <modal header="Confirm changes" :sub-header="subHeader" @close="$emit('close')">
      <div class="sign-in" slot="body">
        <form class="sign-in__form" @submit.prevent="reAuthenticate">          
          <label-input 
            label="Password"
            v-model="password" 
            input-type="password" 
            id="password"
            required="required"
            placeholder="••••••••••"
            autocomplete="current-password">
          </label-input>
          <div v-if="errorMessage" class="error-message">{{errorMessage}}</div>    

          <div>
            <btn type="submit" :is-loading="submitting" :is-disabled="!password" class="btn--primary btn--full">
              Confirm changes              
            </btn>      

            <btn type="button" class="btn--neutral btn--full" @click="$emit('close')">
              Cancel              
            </btn>
          </div>
        </form>        
      </div>
    </modal>
</template>
  
<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex'
import Btn from '@/components/form/btn.vue';
import LabelInput from '@/components/form/label-input.vue';
import Modal from '@/components/modal.vue';

export default {
  name: 'ConfirmLogin',  
  components: {
    Btn,
    LabelInput,
    Modal,
  },
  props: {    
    show: {
      type: Boolean,
      default: true
    },
    subHeader: String
  },
  data() {
    return {            
      submitting: false,
      password: '',
      errorMessage: '',
    };
  },  
  methods: {    
    ...mapMutations(['addSnackbar']),
    reAuthenticate() {
      const self = this;

      if (this.$data.password) {        
        this.$data.submitting = true;
        this.$data.errorMessage = '';

        const credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email, 
          this.$data.password
        );

        firebase.auth().currentUser.reauthenticateWithCredential(credential)
        .then(() =>  {
          self.$emit('close');
          self.$emit('confirmed');
        })
        .catch((error) => {  
          if (error.code === 'auth/wrong-password') {
            this.$data.errorMessage = 'Invalid password';
          } else {
            this.addSnackbar({
              type: 'error',
              message: 'An error occured when authenticating your credentials'
            });            
          }          
        })
        .finally(() => {
          this.$data.submitting = false;
        });
      }
    }
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/2_Tools/media-queries';
  @import '../assets/styles/4_Base/box-shadows';

  .input-group--horizontal {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-column-gap: 1rem;
  }
</style>
