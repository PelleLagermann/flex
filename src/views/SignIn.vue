<template>
<div>
  <h1>SIGN IN</h1>
  <form @submit.prevent="signIn">
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
      <input type="submit" value="Sign in">
    </div>
  </form>

  <router-link to="/sign-up">Sign Up</router-link>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'SignIn',
  components: { },
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

</style>
