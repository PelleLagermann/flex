<template>
  <div class="center-content--vertical sign-in">
    <form class="hover-box sign-in__form" @submit.prevent="signIn">
      <h1 class="hover-box__header hover-box__header--center">SIGN IN</h1>

      <label-input 
        label="E-mail"
        v-model="email" 
        input-type="email" 
        id="email"      
        required="required"
        placeholder="email@example.com"
        autocomplete="username">
      </label-input>

      <label-input 
        label="Password"
        v-model="password" 
        input-type="password" 
        id="password"
        required="required"
        placeholder="••••••••••"
        autocomplete="current-password">
      </label-input>    

      <div>
        <div v-if="errorMessage" class="error-message">
          {{errorMessage}}
        </div>
        <btn type="submit" :is-loading="submitting" class="btn--primary btn--full">
          Sign in
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="icon" />    
          </template>
        </btn>

        <router-link to="/reset-password" class="reset-password">
          Reset password
        </router-link>        
      </div>
    </form>
    
    <btn :href="$router.resolve({ name: 'sign-up' }).href" :is-loading="navigating" @click.prevent="navigateToSignUp" class="btn--neutral">
      Sign up
      <font-awesome-icon :icon="['fas', 'user-plus']" class="icon" />
    </btn>      
  </div>
</template>

<script>
import firebase from 'firebase';
import btn from '@/components/form/btn.vue';
import labelInput from '@/components/form/label-input.vue';

export default {
  name: 'SignIn',
  components: {
    btn,
    labelInput,
  },
  data() {
    return {
      email: 'pelj@alka.dk',
      password: 'Reggie',
      submitting: false,
      navigating: false,
      errorMessage: '',
    };
  },  
  methods: {
    signIn() {
      this.$data.submitting = true;
      this.$data.errorMessage = '';

      firebase.auth().signInWithEmailAndPassword(this.$data.email, this.$data.password)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((error) => {
          console.error('sign in errro', error);
          
          if (error.code === 'auth/too-many-requests') {
            // show reCaptcha
            // https://stackoverflow.com/questions/40951731/using-recaptcha-with-firebase
          }
          
          //todo - brug snackbar
          this.$data.errorMessage = error.code === 'auth/wrong-password' ? 'Wrong email or password' : 'An error happened when loggin you in.';
        })
        .finally(() => {
          this.$data.submitting = false;
        });
    },    
    navigateToSignUp() {
      this.$data.navigating = true;
      this.$router.push('sign-up');
    }
  },  
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/4_Base/box-shadows';

  .sign-in {    
    padding-bottom: 5rem;

    &__header { }
    &__form { }

    .reset-password {
      display: inline-block;
      width: 100%;
      margin-top: 1rem;
      text-align: center;
    }

    /deep/ .btn {
      margin-top: 2rem;
    }
  }
</style>
