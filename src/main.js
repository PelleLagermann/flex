import Vue from 'vue';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faUser, faUserPlus, faSearch, faQuoteRight,
  faSignInAlt, faSignOutAlt, faArrowLeft, faPlusCircle,
  faShoppingCart, faClipboardCheck, faUtensils, faGift, faGlobeEurope,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import store from './store/store';
import router from './router';
import App from './App.vue';

// Adding icons to project
library.add(
  faUser, faUserPlus, faSearch, faQuoteRight,
  faSignInAlt, faSignOutAlt, faArrowLeft, faPlusCircle,
  faShoppingCart, faClipboardCheck, faUtensils, faGift, faGlobeEurope,
  faSquare, faCheckSquare,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
