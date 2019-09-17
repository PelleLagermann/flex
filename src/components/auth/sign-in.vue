<template>
  <form @submit="signInHandler">
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
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SignIn',
  components: { },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState([
      'authError',
    ]),
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    signInHandler(evt) {
      evt.preventDefault();

      this.signIn({ email: this.email, password: this.password })
        .then((a, b, c) => {
          console.log(a, b, c);
        })
        .catch((a, b, c) => {
          console.log(a, b, c);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
