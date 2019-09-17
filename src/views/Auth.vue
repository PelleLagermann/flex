<template>
  <div class="about">
    <h1>This is an auth page - Sign in | Sign up</h1>

    <sign-in></sign-in>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/auth/sign-in.vue';

export default {
  name: 'auth',
  components: {
    SignIn,
  },
};
</script>
