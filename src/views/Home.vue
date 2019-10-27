<template>
  <div class="home-screen">
    <weekday-slider></weekday-slider>

    <div class="registrations-wrapper">
      <div class="registrations">
        <div style="width: 100%; height: 40px; background-color: hotpink;"></div>
      </div>

      <div class="buttons">
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
import Btn from '@/components/form/btn.vue';
import WeekdaySlider from '@/components/weekday-slider.vue';

export default {
  name: 'home',
  components: {
    Btn,
    WeekdaySlider,
  },
  methods: {
    ...mapActions('registrations', ['getRegistrations']),
    startTimer() {

    },
  },
  mounted() {
    this.getRegistrations();
  },
};
</script>

<style lang="scss" scoped>
  .home-screen {
    height: 100%;
  }

  .registrations-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .registrations {
    width: 100%;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .start-timer-btn {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: var(--success-4);

    .icon {
      color: var(--success-7);
      font-size: 5rem;
    }
  }
</style>
