<template>  
    <transition name="modal">      
      <div class="modal__backdrop">
        <div class="modal__content-wrapper">
          <div class="hover-box modal__content-container">

            <div class="modal__header-wrapper">
              <slot name="header">
                <h2 class="modal__header">
                  {{header}}
                  <span v-if="subHeader" class="modal__header-sub">{{subHeader}}</span>
                </h2>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>            

            <button type="button" class="modal__close-btn" @click="$emit('close')">
              <span class="sr-only">Close</span>
              <font-awesome-icon :icon="['fas', 'times']" class="icon" />
            </button>
          </div>
        </div>
      </div>      
    </transition>  
</template>
  
<script>
export default {
  name: 'Modal',  
  props: {    
    header: {
      type: String,
      default: ""
    },
    subHeader: {
      type: String,
      default: ""
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {      
      
    };
  }, 
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/2_Tools/media-queries';
  @import '../assets/styles/4_Base/box-shadows';

  .modal {
    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      display: table;
      width: 100%;
      height: 100%;
      // Copied color code as it seems there is a bug in SASS
      //background-color: hsla(var(--neutral-0-base), .8);
      background-color: hsla(210, 24%, 16%, .8);
      transition: opacity .3s ease;
      z-index: 9998;
    }

    &__header {
      margin: 0;

      &-wrapper {

      }

      &-sub {
        display: block;
        font-weight: 400;
      }
    }

    &__content-wrapper {
      display: table-cell;
      vertical-align: middle;    
    }

    &__content-container {
      @include box-shadow-lg('--neutral-4-base');
      
      position: relative;
      width: 95vw;
      max-width: 60rem;
      transition: all .3s ease;      
    }

    &__close-btn {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;      
      border: 1px solid var(--neutral-7);
      border-radius: 50%;
      background-color: var(--neutral-9);
      color: var(--neutral-2);
      font-size: 2rem;
      transform: translate(20%, -20%);

      &:focus {
        outline: 0;
      }
    }
  }

  

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__content-container,
.modal-leave-active .modal__content-container {  
  transform: scale(1.1);
}
</style>
