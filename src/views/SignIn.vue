<template>
<div class="sign-in">
  <form class="sign-in__form" @submit.prevent="signIn">
    <h1 class="sign-in__header">SIGN IN</h1>

    <label>
      <span>E-mail</span>
      <input type="email"
             id="email"
             v-model="email"
             placeholder="email@example.com"
             autocomplete="username"
             required="required">
    </label>

    <label>
      <span>Password</span>
      <input type="password"
             id="password"
             v-model="password"
             placeholder="••••••••••"
             autocomplete="current-password"
             required="required">
    </label>

    <div>
      <btn type="submit" class="btn--primary">Sign in</btn>
      <btn type="submit" class="btn--secondary">Sign in</btn>
      <btn type="submit" class="btn--neutral">Sign in</btn>
      <btn type="submit" class="btn--error">Sign in</btn>
      <btn type="submit" class="btn--warning">Sign in</btn>
      <btn type="submit" class="btn--success">Sign in</btn>
    </div>
  </form>

  <router-link to="/sign-up">Sign Up</router-link>
</div>
</template>

<script>
import firebase from 'firebase';
import btn from '@/components/form/btn.vue';

export default {
  name: 'SignIn',
  components: {
    btn,
  },
  data() {
    return {
      email: 'pelj@alka.dk',
      password: 'Reggie',
    };
  },
  computed: {

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
  },
};
</script>

<style lang="scss" scoped>
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
      width: 90vw;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 3px;
      background-color: #fff;
    }
  }
</style>
