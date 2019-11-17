<template>
  <div class="home-screen">
    <weekday-slider></weekday-slider>

    <div class="active-day">
      <div class="active-day__date-wrapper">
        <div class="active-day__date">
          {{activeDate.format('YYYY-MM-DD')}}
        </div>        
        <h2 class="active-day__day">
          {{activeDate.format('dddd')}}
        </h2>        
      </div>

      <div class="active-day__registrations-wrapper">
        {{activeDay.registrations.length}}
      </div>      
    </div>

    <div class="registrations-wrapper">
      <div class="registrations">
        <div style="width: 100%; height: 40px; background-color: hotpink;"></div>
      </div>

      <!-- <div class="buttons">
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>
        <btn @click.prevent="startTimer" class="btn--clear start-timer-btn">
          <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon" />
        </btn>

        <btn @click="showAddManuelRegistration = true">
          Add manual registration
          <font-awesome-icon slot="btn" :icon="['fas', 'edit']" class="icon" />    
        </btn>
      </div> -->
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
//import Btn from '@/components/form/btn.vue';
import { mapState, mapGetters } from 'vuex';
import WeekdaySlider from '@/components/weekday-slider.vue';

export default {
  name: 'home',
  components: {
    //Btn,    
    WeekdaySlider,        
  },
  data() {
    return {
      showAddManuelRegistration: false
    }
  },
  computed: {
    ...mapState(['activeDate']),
    ...mapGetters('registrations', ['activeDay']),
  },
  methods: {    
    startTimer() {

    },
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
  .home-screen {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }

  .active-day {
    margin: 0;
  }

  .active-day__date-wrapper {
    text-align: center;
  }

  .active-day__day {
    text-transform: capitalize; 
  }

  .active-day__date {

  }

  .registrations-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    overflow-y: scroll;
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
