<template>
  <div class="weekday-slider">
    <ol class="weekday-slider__list">
      <li
        v-for="(day) in activeWeek"
        :key="day.date.format('dddd')"
        class="weekday-slider__item">
        <btn
          class="weekday-slider__item-btn"
          :class="{ 'is-today': isToday(day.date),
                    'is-active': isActiveDate(day.date) }"
          @click="setActiveDate($event, day.date)">
          <span class="weekday-slider__item-date">{{day.date.format('D/M')}}</span>

          <span class="weekday-slider__item-btn-inner">
            <span class="weekday-slider__item-day">{{day.date.format('ddd')}}</span>
            <span class="weekday-slider__item-hours">              
              {{dayTotal(day)}}
              <!-- {{weekday.hours}} -->
            </span>
          </span>
        </btn>
      </li>
    </ol>    
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapGetters } from 'vuex';
import Btn from '@/components/form/btn.vue';

export default {
  name: 'WeekdaySlider',
  components: {
    Btn,
  },
  data() {
    return {
      weekdays: [],
    };
  },
  computed: {
    ...mapState(['activeDate']),
    ...mapState('settings', ['firstDayOfWeek']),
    ...mapGetters('registrations', ['activeWeek', 'registrations']),
  },
  methods: {
    isToday(date) {
      const today = dayjs(new Date());
      return today.isSame(date, 'day');
    },
    isActiveDate(date) {
      return this.activeDate.isSame(date, 'day');
    },
    setActiveDate(e, date) {
      // this.$data.activeDate =
      // console.log('e', e);
      this.$store.commit('setActiveDate', date.format('YYYY-MM-DD'));
    },
    dayTotal(day) {
      if (!day.registrations) {
        return '-';
      }
      
      let hours = 0;
      let minutes = 0;

      day.registrations.forEach(reg => {
        hours += reg.hours;
        minutes += reg.minutes;

        if (minutes >= 60) {
          hours += 1;
          minutes -= 60;
        }
      });      

      if (!hours && !minutes) {
        return '-';
      }

      return `${hours}:${minutes}`;
    },
  },
  mounted() {
    console.log('activeWeek', this.activeWeek);    
  },
};
</script>

<style scoped lang="scss">
  .weekday-slider {
    &__list {
      display: flex;
      flex-wrap: nowrap;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    &__item {
      width: calc(100% / 7);      
    }

    &__item-btn {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;

      &:focus {
        outline: 0;
      }
    }

    &__item-date {
      background-color: var(--neutral-7);
      color: var(--neutral-1);
      font-size: 1.2rem;
      line-height: 1.6;
      letter-spacing: .1em;
      text-transform: uppercase;

      .is-today & {
        background-color: var(--neutral-4);
        color: var(--neutral-8);
      }

      .is-active:not(.is-today) & {
        background-color: var(--secondary-8);
      }
    }

    &__item-btn-inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: .7rem 0;
      background-color: var(--primary-3);
      box-shadow: inset 0px 0px 3px 0px var(--primary-1);

      .is-today & {
        background-color: var(--primary-1);
        text-shadow: .1em .1em .2em rgba(0, 0, 0, 0.6);
        box-shadow: none;
      }

      .is-active & {
        background-color: var(--secondary-4);
        font-weight: 700;
        box-shadow: none;
      }
    }

    &__item-day {
      color: var(--neutral-8);
      font-size: 1.2rem;
      text-transform: uppercase;
    }

    &__item-hours {
      color: var(--neutral-9);
      font-size: 1.4rem;
    }
  }
</style>
