<template>  
    <modal header="Manual registration" :sub-header="activeDate.format('ddd DD MMM YYYY')" @close="$emit('close')">
      <form @submit.prevent="addManualRegistration" slot="body">
        <radio-group name="reg-type" v-model="regType" :options="[{ value: 'period', text: 'Select period' }]"></radio-group>
        
        <div>
          <input v-model="from" type="time" min="00:00" max="23:59">

          <input v-model="to" type="time" min="00:00" max="23:59">
        </div>
        
        <radio-group name="reg-type" v-model="regType" :options="[{ value: 'value', text: 'Enter value' }]"></radio-group>
        <div class="input-group--horizontal">
          <label-input 
            label="Hours"
            v-model="hours" 
            id="hours"
            input-type="number" 
            min="0"
            max="24"
            step="1">
          </label-input>

          <label-input 
            label="Minutes"
            v-model="minutes" 
            id="minutes"
            input-type="number"
            min="0"
            max="59"
            step="1">
          </label-input>
        </div>
        

        <btn type="submit" :is-loading="submitting" class="btn--primary btn--full" :is-disabled="!formValid">
          Add          
        </btn>
      </form>
    </modal>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
import Btn from '@/components/form/btn.vue';
import LabelInput from '@/components/form/label-input.vue';
import Modal from '@/components/modal.vue';
import RadioGroup from '@/components/form/radio-group.vue';

export default {
  name: 'ManualRegistration',  
  components: {
    Btn,
    LabelInput,
    Modal,
    RadioGroup,
  },
  props: {    
    show: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      regType: 'value',
      regTypeOptions: [
        { value: 'period', text: 'Select period' },
        { value: 'value', text: 'Enter value' }
      ],
      from: '',
      to: '',
      hours: '',
      minutes: '',
      submitting: false
    };
  },
  computed: {
    ...mapState(['activeDate']),
    formValid() {      
      return this.$data.hours !== null && this.$data.minutes !== null;
    }
  },
  methods: {
    ...mapActions('registrations', ['submitRegistration']),
    addManualRegistration() {
      if (this.formValid) {
        this.$data.submitting = true;
        
        let hours = this.$data.hours.length > 0 ? parseInt(this.$data.hours) : 0;
        let minutes = this.$data.minutes.length > 0 ? parseInt(this.$data.minutes) : 0;

        this.submitRegistration({ hours: hours, minutes: minutes })
          .then(() => {
            
          }).catch((error) => {
            console.error('Error submitting registration', error);
          }).finally(() => {
            this.$data.submitting = false;
            this.$emit('close');
          });
      }
    }
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/2_Tools/media-queries';
  @import '../assets/styles/4_Base/box-shadows';

  .input-group--horizontal {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-column-gap: 1rem;
  }
</style>
