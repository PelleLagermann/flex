<template>
  <div>
    <h1>SIGN UP</h1>
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

    <router-link to="/sign-in">Sign In</router-link>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'SignUp',
  components: { },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {

  },
  methods: {
    signIn() {
      firebase.auth().createUserWithEmailAndPassword(this.$data.email, this.$data.password)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((error) => {
          console.log('sign Up errro', error);
          // HANDLE SIGN UP ERROR
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
