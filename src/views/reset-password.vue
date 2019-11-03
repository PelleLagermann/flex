<template>
  <div class="center-content--vertical sign-up">    
    <form @submit.prevent="resetPassword" class="hover-box">
      <h1 class="hover-box__header hover-box__header--center">RESET PASSWORD</h1>

      <label-input 
        label="E-mail"
        v-model="email" 
        input-type="email" 
        id="email"      
        required="required"
        placeholder="email@example.com"
        autocomplete="username">
      </label-input>

      <div>
        <btn type="submit" :is-loading="submitting" class="btn--primary btn--full">
          Reset password          
        </btn>      
      </div>
    </form>

    <btn :href="signInHref" :is-loading="navigating" @click.prevent="navigateToSignIn" class="btn--neutral">
      Sign in
      <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="icon" />
    </btn>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
import btn from '@/components/form/btn.vue';
import labelInput from '@/components/form/label-input.vue';

export default {
  name: 'ResetPassword',
  components: {
    btn,
    labelInput,
  },
  data() {
    return {
      email: '',      
      signInHref: '',
      submitting: false,
      navigating: false,
    };
  },
  computed: {

  },
  methods: {
    ...mapMutations(['addSnackbar']),
    resetPassword() {
      const self = this;
      this.$data.submitting = true;

      firebase.auth().sendPasswordResetEmail(this.$data.email).then(function() {
        self.addSnackbar({
          message: 'Password reset email sent',
          type: 'success',
          delay: 1000
        });
          
        self.$router.replace('sign-in');
      }).catch(function(error) {
        console.log('sign Up errro', error);
      });

      // firebase.auth().createUserWithEmailAndPassword(this.$data.email, this.$data.password)
      //   .then(() => {
      //     this.$router.replace('home');
      //   })
      //   .catch((error) => {
      //     console.log('sign Up errro', error);
      //     // HANDLE SIGN UP ERROR
      //   });
    },
    navigateToSignIn() {
      this.$data.navigating = true;
      this.$router.push('sign-in');
    },
  },
  mounted() {
    this.$data.signInHref = this.$router.resolve({ 
      name: 'sign-in',
    }).href;    
  },
};
</script>

<style lang="scss" scoped>

</style>
