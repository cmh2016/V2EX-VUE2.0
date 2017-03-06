<template>
  <div class="article-detail">
    <loading v-model="show" text="加载中.."></loading>
    <x-header :title='title'></x-header>
    <div v-show="!show">
      <div class="h1">{{list.title}}</div>
       <div class="info"><span class="user" v-text='author'></span>发表于 <span class="time">{{list.created | time}}</span></div>
       <div class="contant">
         {{list.content}}
       </div>
       <div v-show="reply.length>0" class="reply">
         <div class="commentBOX">
        <div class="libox" flex="dir:top box:first">
            <span class="commentHead">回复详情：<span style="float:right">共{{reply.length}}条</span></span>
            <div v-for="item in reply" class="commentContent" flex="dir:left box:first">
                <div class="left" flex="dir:top box:last">
                <span>
                   <router-link :to="{ path: '/user', query: { username: item.member.username }}"><img  :src="item.member.avatar_normal" alt=""></router-link>
                </span>
                    <p>{{item.member.username}}</p>
                </div>
                <div class="right" flex="dir:top box:first cross:baseline">
                    <div class="commentLevel" flex="dir:left box:mean">
                       最后回复时间：{{item.last_modified | time}} <span v-show="item.thanks>0" style="width:3rem;margin-right:.5rem;margin-left:.5rem">♥ {{item.thanks}}</span>
                    </div>
                    <p class="commentText">{{item.content_rendered}}</p>
                </div>
            </div>
        </div>
    </div>
       </div>
       <div v-show="reply.length==0" class="reply">
          <span class="commentHead">暂无回复</span>
       </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import XHeader from 'components/header_back'
import { Loading } from 'vux'
export default {
  components: {
    XHeader,
    Loading
  },
  data () {
    return {
      list:[],
      reply:[],
      title:'文章详情',
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
  methods: {
     getInfo:function () {

          let that = this 
          function getArticleInfo() {
            return that.$http.get('/api/topics/show.json?id='+that.$route.query.id);
          }

          function getArticleReply() {
            return that.$http.get('/api/replies/show.json?topic_id='+that.$route.query.id);
          }
          console.log()
         that.$http.all([getArticleInfo(), getArticleReply()])
          .then(that.$http.spread(function (info, reply) {
            console.log(reply.data)
            // 两个请求现在都执行完成
              that.$data.list = info.data[0];
              that.$data.reply= reply.data;
              that.$data.author = info.data[0].member.username;
             
              that.$nextTick(function(){
                that.$data.show=false;
              })
            }));
           
        
      }
  }
}
function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 50)
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../assets/common.less';
  .article-detail{
    text-align: center;
    .h1{
      margin:.5rem;
      font-size: 1rem;
      color:#333;
      padding-top: 60px;
    }
    .info{
      font-size: .8rem;
      color: #c6c4c4;
      padding-bottom: .5rem;
      border-bottom: 1px solid #f2f2f2;
      .user,.time{
        color:#999;
        margin: 0 .5rem;
      }
    }
    .contant{
      margin: .5rem auto;
      font-size: .8rem;
      line-height:1.5rem;
      text-indent: 2rem;
      text-align: left;
      width: 95vw;
      overflow: hidden;
    }
    .reply{
      padding-top: .5rem;
      border-top: 1px solid #f2f2f2;
      .commentBOX {
    margin: 0rem .5rem;
    height: auto;
    padding-bottom: .5rem;
    text-align: left;
}

.commentBOX .libox .commentHead {
    display: none
}

.commentBOX .libox:first-child .commentHead {
    display: block
}

.commentBOX .commentHead {
    font-size: .6rem;
    color: #999;
    height: 1rem;
    line-height: 1rem;
    margin-top: .4rem;
    margin-bottom: .2rem
}

.commentBOX .commentContent {
    height: auto
}

.commentBOX .commentContent .left {
    margin-right: .5rem;
    height: 4rem
}

.commentBOX .commentContent .left span {
    height: 3rem;
    width: 3rem;
    margin: 0 auto;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px
}

.commentBOX .commentContent .left span img {
    width: 100%;
    height: 100%
}

.commentBOX .commentContent .left p {
    font-size: .4522rem;
    color: #f63;
    text-align: center;
    width: 3rem;
    .ellipsesOne;
}

.commentBOX .commentContent .right {
    height: auto
}

.commentBOX .commentContent .right .commentLevel {
    margin-left: .2rem;
    margin-top: .3rem;
    font-size: .6rem;
    color: #999;
}
.commentBOX .commentContent .right .commentText {
    font-size: .6rem;
    color: #333;
    height: auto;
    margin-top: .3rem;
    line-height: 1rem
}
    }
  }
</style>