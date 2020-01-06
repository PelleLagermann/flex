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
        <div class="registration" v-for="registration in activeDay.registrations" v-bind:key="registration.activeDate">
          <div class="registration-hour" v-if="registration.hours > 0">
            {{registration.hours}} {{registration.hours > 1 ? 'timer' : 'time' }}
          </div>
          <div class="registration-minutes" v-if="registration.minutes > 0">
            {{registration.minutes}} minutter
          </div>
          <div class="registration-edit">
            <btn type="button" @click="editRegistration" class="btn--clear">
              <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
            </btn>       
          </div>
        </div>
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
import Btn from '@/components/form/btn.vue';

export default {
  name: 'home',
  components: {
    Btn,    
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

    editRegistration() {

    }
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

  .registration {
    color: var(--neutral-8);
    padding: 10px 15px;
    position: relative;
    margin: 8px 15%;
    box-shadow: inset 0px 0px 3px 0px var(--primary-1);
    background-color: var(--primary-3);
  }

  .registration-hour {
    display: inline-block;    
    margin-right: 5px;
  }

  .registration-minutes {
    display: inline-block;
    margin-right: 5px;
  }

    .registration-edit button {
      color: white;
      position: absolute !important;
      right: 10px;
      padding: 0 5px;
      top: 10px;
      display: inline-block;
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
