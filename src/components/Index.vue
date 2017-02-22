<template>
  <div>
    <x-header></x-header>
    <div style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <tab style="width:500px;" bar-active-color="#668599" :line-width="1"  v-model="index">
            <tab-item :selected="activeTab === item.tag" v-for="item in tabList"  @on-item-click="getList(item)">{{item.name}}</tab-item>
           
          </tab>
    </div>
   <!--  <scroller :lock-x="true" :scrollbar-y="true" height="-145px" ref="scroller" :bounce="true"> -->
     <div :style="{height:bodyHeight}" class="contant">
<!--    <p v-for="i in 200" >placeholder {{ i + '' + i }}</p>  -->
<flexbox v-for="item in list">
     <flexbox-item :span="2"><img  :src="item.member.avatar_normal" alt=""></flexbox-item>
     <flexbox-item>
     <router-link :to="{ path: '/detail', query: { id: item.id }}"><h2  class="title" v-text="item.title"></h2></router-link>
     
       <flexbox :gutter="5">
       <flexbox-item :span="2">
       <span  class="tag" v-text="item.node.title"></span>
     </flexbox-item>
     <flexbox-item>
       <span class="user" v-text="item.member.username"></span>
     </flexbox-item>
      <flexbox-item>
       <span class="time">{{item.last_modified | time}}</span>
     </flexbox-item>
     <flexbox-item :span="1">
       <span class="reply" v-text="item.replies"></span>
     </flexbox-item>
       </flexbox>
     </flexbox-item>
     </flexbox>

     </div>
  <!--  </scroller> -->
    <x-footer></x-footer>
   <!-- <loading :show="loading"></loading> -->
  </div>
</template>

<script>
import { Group, Cell,Flexbox,FlexboxItem, Scroller ,Tab, TabItem,dateFormat,Loading} from 'vux'
import XHeader from './header'
import XFooter from './footer'

export default {
  components: {
    Group,
    Cell,
    XHeader,
    Tab,
   TabItem,
  XFooter,
  Scroller,
  Flexbox,
  FlexboxItem,
  Loading
  },

  data () {
      return {
           type: '1',
           list: [],
           bodyHeight:'',
           tabList:[{name:"热门",tag:"hot"},{name:"最新",tag:"latest"},"技术","创意","问与答"],
           activeTab:"hot",
           index:0,
           loading:true,
           loadingText:"加载中..",
         }

  },
  mounted (){
    
     this.getList()
     this.getBodyHeight()
  },
  methods:{
      getList:function (e) {
          this.$data.activeTab = e?e.tag:this.activeTab
          let that = this  
          this.$http.get('/api/topics/'+that.$data.activeTab+'.json').then(function(res){
            console.log(res)
                    that.$data.list=res.data;
            })
      },
      getBodyHeight:function(){
          let height = document.documentElement.clientHeight;
          this.$data.bodyHeight = height-154+"px";
      }
  }

}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../assets/common.less';
.contant{
  width: 95%;
  margin: 2.5%;
  overflow-x:hidden;
  overflow-y: scroll;
   -webkit-overflow-scrolling: touch;
   -webkit-transform: translate3d(0, 0, 0);
-moz-transform: translate3d(0, 0, 0);
-ms-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
  .title{
    font-size: .79rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;  
    color: #333;
  }
  .tag{
    padding: 5px;
    background-color: #f5f5f5;
    color: #999;
    font-size: .6rem;
  }
  .user{
    font-size: .7rem;
  }
  .time{
    font-size: .68rem;
    color: #666;
  }
  .reply{
    font-size: .65rem;
    padding: 8px;
    border-radius: 50%;
    background-color: #f5f5f5;
  }
  .vux-flexbox{
    margin-bottom: .5rem;
  }
}
</style>
