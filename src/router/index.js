import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Index'
import Detail from '../view/Detail'
import node from "../view/node";
import about from "../view/about";
import nodeDetail from "../view/node_detail";
import user from "../view/user";
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home,
        name: "首页"
    }, {
        path: '/detail',
        component: Detail,
        name: "详情"
    }, {
        path: '/node',
        component: node,
        name: "主题"
    }, {
        path: '/about',
        component: about,
        name: "关于"
    }, {
        path: '/node_detail',
        component: nodeDetail,
        name: "主题详情"
    },{
        path:'/user',
        component:user,
        name: '用户中心'
    }],
    mode: 'history',
   scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

})
