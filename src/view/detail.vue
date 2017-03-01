<template>
  <div class="article-detail">
    <x-header :title='title'></x-header>
    <div class="h1">{{list.title}}</div>
    {{this.$route.query.id}}
    <div class="info"> 发表于 {{list.created | time}}</div>
  </div>
</template>

<i18n>
</i18n>

<script>
import XHeader from 'components/header_back'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      list:[],
      reply:[],
      title:'文章详情'

    }
  },
   created (){
		this.getInfo()
   },
  watch:{
    "$route":'getInfo'
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
            console.log(info.data[0])
            // 两个请求现在都执行完成
              that.$data.list = info.data[0];
              that.$data.reply= reply.data;
            }));
           
        
      },
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
@import '../assets/common.less';
  .article-detail{
    text-align: center;
    .h1{
      margin:.5rem auto;
      font-size: 1.2rem;
      color:#333;
    }
    .info{
      font-size: .8rem;
      color: #999;
    }
  }
</style>