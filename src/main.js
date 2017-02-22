// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Index'
import Detail from './components/detail.vue'
import axios from 'axios'
import moment from 'moment'
Vue.prototype.$http = axios

Vue.use(VueRouter)
const routes = [
	{
  		path: '/',
  		component: Home
	},
	{
		path:'/detail',
		component:Detail
	}
]
//时间过滤器
Vue.filter('time',function(val) {
	if(!val) return '暂无'
      moment.locale('zh-cn');        
      let unix = moment.unix(val);
     let times = moment(unix).fromNow(); /*moment.unix();*/
     return times
});
const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
