<template>
<div class="user">
 <loading v-model="show" text="加载中.."></loading>
	 <x-header :title='title'></x-header>
	 <div v-show="!show" class="box">
	 	<img class="bg" :src="info.avatar_large" alt="">
	 	<div class="zz"></div>
	 	<img :src="info.avatar_large" alt="" class="userPic">
	 	<div class="info">
      <p>用户名：{{info.username?info.username:'暂无'}}</p> 
      <p>描述：{{info.tagline?info.tagline:'暂无'}}</p>
      <p>网站：{{info.website?info.website:'暂无'}}</p>
      <p>位置：{{info.location?info.location:'暂无'}}</p>
      <p>github：{{info.github?info.github:'暂无'}}</p>
      <p>bio：{{info.bio?info.bio:'暂无'}}</p>
    </div>
    <div class="list">
      <p>发表的文章</p>
      <flexbox v-for="item in list">
     <flexbox-item :span="2"> <router-link :to="{ path: '/user', query: { username: item.member.username }}"><img  :src="item.member.avatar_normal" alt=""></router-link></flexbox-item>
     <flexbox-item>
     <router-link :to="{ path: '/detail', query: { id: item.id }}"><h2  class="title" v-text="item.title"></h2><span class="reply" v-text="item.replies"></span></router-link>
     
       <flexbox :gutter="5">
       <flexbox-item :span="3">
       <span  class="tag" v-text="item.node.title"></span>
     </flexbox-item>
     <flexbox-item>
       <span class="user" v-text="item.member.username"></span>
     </flexbox-item>
      <flexbox-item>
       <span class="time">{{item.last_modified | time}}</span>
     </flexbox-item>
       </flexbox>
     </flexbox-item>
     </flexbox>
    </div>
	 </div>
</div>
</template>

<script>
import XHeader from 'components/header_back'
import { Loading,Flexbox,FlexboxItem } from 'vux'
export default {

  name: 'user',
 components: {
    XHeader,
    Loading,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      info:[],
      list:[],
      title:'用户信息',
      show:true,
      author:''

    }
  },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
      next(vm => {
        // 通过 `vm` 访问组件实例
        //重置loading
        vm.$data.show = true;
        //重新获取对应id数据
        vm.getInfo();
      })
  },
  methods:{
  	getInfo:function () {

          let that = this 
          function getUserInfo() {
            return that.$http.get('/api/members/show.json?username='+that.$route.query.username);
          }

          function getUserList() {
            return that.$http.get('/api/topics/show.json?username='+that.$route.query.username);
          }
         that.$http.all([getUserInfo(), getUserList()])
          .then(that.$http.spread(function (info, list) {
            console.log(list.data)
            // 两个请求现在都执行完成
              that.$data.info = info.data;
              that.$data.list= list.data;
              
             
              that.$nextTick(function(){
                that.$data.show=false;
              })
            }));
           
        
      }
  }

};
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../assets/common.less';

.user{
	.box{
		width: 100vw;
		height: 320px;
		margin-top: 45px;
		position: relative;
		.bg{
			width: 100vw;
			height: 100%;
			position: absolute;
			left: 0;
			z-index: 12;
			top: 0;
   			 -webkit-filter: blur(15px); /* Chrome, Opera */  
            filter: blur(15px);
    		
		}
		.zz{
			width: 100vw;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 33;
			background-color: rgba(0,0,0, .5);
		}
		.userPic{
			position: absolute;
			top:30px;
			left: 40%;
			width: 70px;
			height: 70px;
			border-radius: 50%;
			z-index: 6666;
		}
		.info{
			position: absolute;
			top: 110px;
			left: 10%;
			text-align: left;
      font-size: .8rem;
      color: #fff;
      z-index: 999;

		}
    .list{
      position: relative;
      top:350px;
      left: 2.5%;
      z-index: 666;
      width: 95%;

       .vux-flexbox{
    margin-bottom: .5rem;
  }
  .title{
    font-size: .79rem;
    font-weight: 400;
    .ellipsesOne;
    color: #333;
    display: inline-block;
    width: 80%;
  }
  .tag{
    padding: 3px;
    background-color: #f5f5f5;
    color: #999;
    font-size: .6rem;
    .ellipsesOne;
  }
  .user{
    font-size: .7rem;
    .ellipsesOne;
  }
  .time{
    font-size: .68rem;
    color: #666;
  }
  .reply{
    font-size: .65rem;
    display: inline-block;
    min-width: 25px;
    min-height: 25px;
    line-height: 25px;
    border: 4px solid #f5f5f5;
    border-radius: 50%;
    color: #333;
     vertical-align: middle;
     text-align: center;
    float: right;
     background-color: #f5f5f5;
  }
    }
	}
}
</style>