<template>
  <div class="hello">
    <h1>Noter</h1>
    <h2>Navn / domæne</h2>
    <p>
      "Reggie" er taget <br>
      "tidsreg" er tilgengæld ledigt som både com, io og app
    </p>

    <h2>Demo URL</h2>
    <p>
      <a href="https://tidsreg.netlify.com" target="_blank">https://tidsreg.netlify.com</a>
    </p>

    <h2>Internationalization</h2>
    <div>
      <a href="https://kazupon.github.io/vue-i18n/started.html#html">Vue I18n</a> <br>
      <a href="https://medium.com/hypefactors/add-i18n-and-manage-translations-of-a-vue-js-powered-website-73b4511ca69c">Add i18n and manage translations of a Vue.js powered website</a>
    </div>

    <h2>Icons</h2>
    <div>
      <a href="https://fontawesome.com/">Font Awesome</a>
      <p>Add icon to main.js and use as seen below</p>
      <pre>
        &lt;font-awesome-icon icon="quote-right" class="icon" /&gt;
      </pre>
    </div>

    <h2>Design</h2>
    <ul>
      <li>Color palette - Maybe choose from Refactoring UI to keet it simple?</li>
      <li>Palette 9</li>
    </ul>

    <h2>Routing</h2>
    <ul>
      <li>Code-splitting eller ej? -> Langsommere initial load,
        men kan måske komme til at virke offline hvis ikke</li>
    </ul>

    <h2>HTML Head</h2>
    <a href="https://htmlhead.dev/">https://htmlhead.dev/</a>

    <h2>Firebase</h2>
    <h3>Registrations</h3>
    <ul>
      <li>UserId</li>
      <li>Dato</li>
      <li>Fra</li>
      <li>Til</li>
      <li>Total</li>
    </ul>

    <h3>Users</h3>

    <h3>Settings</h3>

    <hr>

    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
