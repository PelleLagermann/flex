<template>
  <div class="home">
    <weekday-slider></weekday-slider>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import WeekdaySlider from '@/components/weekday-slider.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    WeekdaySlider,
  },
};
</script>
