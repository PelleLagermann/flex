<template>  
  <div class="loading-wrapper">
    <div class="clock-spinner"></div>        
  </div>
</template>
  
<script>
export default {
  name: 'loading-spinner',
};
</script>

<style lang="scss">  
  :root {  
    --clock-radius: 60px;
    --hand-width: calc(var(--clock-radius) * .12);
  }

  .loading-wrapper {    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;    
  }

  .clock-spinner,
  .clock-spinner::before,
  .clock-spinner::after {
      border-radius: 50%;
  }

  .clock-spinner {  
    position: relative;
    padding: var(--clock-radius);
    border: calc(var(--clock-radius) * .1) solid var(--primary-1);
  }

  /* both hands */
  .clock-spinner::before,
  .clock-spinner::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: var(--hand-width);
      padding-right: calc(var(--clock-radius) - var(--hand-width) / 2);
      padding-bottom: calc(var(--clock-radius) * .95);
      padding-left: calc(var(--clock-radius) - var(--hand-width) / 2);
      box-sizing: content-box;
      background-clip: content-box;
      animation: linear infinite clock;
  }

  /* hour hand */
  .clock-spinner::before {
      height: calc(var(--clock-radius) * .6 + var(--clock-radius) * 0.05);
      padding-top: calc(var(--clock-radius) * .4);
      background-color: var(--neutral-2);
      animation-duration: 9s;
  }

  /* minute hand */
  .clock-spinner::after {
      height: calc(var(--clock-radius) * .8 + var(--clock-radius) * 0.05);
      padding-top: calc(var(--clock-radius) * .2);
      background-color: var(--neutral-2);
      animation-duration: .75s;
  }

  @keyframes clock {
      to { transform: rotate(360deg); }
  }
</style>
