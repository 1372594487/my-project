import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
//允许跨域携带cookie
axios.defaults.withCredentials = true;
// axios拦截器，在发起请求之前执行
// nodejs跨域请求，post参数必须进行序列化，不然即使后台
// 允许跨域，后台也无法接收
axios.interceptors.request.use(config => {
  if (config.method == 'post') {
    //设置请求头
    // config.headers['Content-Type']='application/x-www-form-urlencoded';
    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }
    //重新赋值
    config.data = paramsString.slice(0, -1);
  }
  //返回config
  return config;
});


//------------utils-------------------------
Vue.prototype.goPage = function (route) {
  let test = window.location.href;
  test = test.split('/')[test.split('/').length-1].toLowerCase();
  let b = route.toLowerCase();
  console.log(test,b);
  if(test == b){
    return;
  } 
  this.$router.push({ name: route })
}
//------------prototype---------------------
Vue.prototype.baseUrl = 'http://127.0.0.1:10001'
//------------prototype---------------------
//------------utils-------------------------

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
