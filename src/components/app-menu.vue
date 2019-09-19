<template>
  <div>
    <h1>menu her...</h1>
    <button @click.prevent="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'AppMenu',
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('sign-in');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
