// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from "./router/index";
import axios from 'axios'
import moment from 'moment'
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n'
Vue.prototype.$http = axios
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        i18n: vuexI18n.store
    }
});
Vue.use(vuexI18n.plugin, store);

//时间过滤器
Vue.filter('time',function(val) {
	if(!val) return '暂无'
      moment.locale('zh-cn');        
      let unix = moment.unix(val);
     let times = moment(unix).fromNow(); /*moment.unix();*/
     return times
});

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
