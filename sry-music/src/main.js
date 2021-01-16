import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import { Button,Toast,Slider } from 'vant';
import { Lazyload } from 'vant';
import { Skeleton } from 'vant';


Vue.config.productionTip = false
Vue
.use(Button)
.use(Toast)
.use(Slider)
.use(Lazyload, {
  lazyComponent: true,
})
.use(Skeleton)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

