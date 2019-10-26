<template>
<div class="sign-in">
  <form class="sign-in__form" @submit.prevent="signIn">
    <h1 class="sign-in__header">SIGN IN</h1>

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
      <btn type="submit" :is-loading="isLoading" class="btn--primary btn--full">
        Sign in
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="icon" />    
        </template>
      </btn>      
    </div>
  </form>
  
  <btn :href="signUpHref" @click.prevent="navigateToSignUp" class="btn--neutral">
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
      signUpHref: '',   
      isLoading: false,
    };
  },  
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.$data.email, this.$data.password)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((error) => {
          console.log('sign in errro', error);
          // HANDLE LOGIN ERROR
        });
    },    
    navigateToSignUp() {      
      console.log("WHAMBA");
      this.$router.push('sign-up');
    }
  },  
  mounted() {
    this.$data.signUpHref = this.$router.resolve({ 
      name: 'sign-up',
    }).href;    
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/4_Base/box-shadows';

  .sign-in {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    
    &__header {
      text-align: center;
    }

    &__form {      
      @include box-shadow-md;
      width: 90vw;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 6px;
      background-color: #fff;       
    }
  }
</style>
