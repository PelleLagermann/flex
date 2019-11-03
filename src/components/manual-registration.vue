<template>  
    <modal header="Manual registration" :sub-header="activeDate.format('ddd DD MMM YYYY')" @close="$emit('close')">
      <form @submit.prevent="addManualRegistration" slot="body">
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

export default {
  name: 'ManualRegistration',  
  components: {
    Btn,
    LabelInput,
    Modal,
  },
  props: {    
    show: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {      
      hours: "",
      minutes: "",
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

        let registrationInput = [this.$data.hours, this.$data.minutes];
        for (let i = 0; i < registrationInput.length; i++) {
          if (registrationInput[i].length === 0) {
            registrationInput[i] = '0';
          }
        }
        
        this.submitRegistration({ hours: registrationInput[0], minutes: registrationInput[1] })
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
