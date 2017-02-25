<template>
  <div>
  <x-welcome v-show="show"></x-welcome>
   <x-loading v-show="loading"></x-loading>
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
  <!--  </scroller> -->
    <x-footer></x-footer>

   <!-- <loading :show="loading"></loading> -->
  </div>

</template>

<script>
import { Group, Cell,Flexbox,FlexboxItem, Scroller ,Tab, TabItem,dateFormat} from 'vux'
import XHeader from 'components/header'
import XFooter from 'components/footer'
import XLoading from "components/loading";
import XWelcome from "components/welcome";
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
    XLoading,
    XWelcome
  },

  data () {
      return {
           type: '1',
           list: [],
           bodyHeight:'',
           tabList:[{name:"热门",tag:"hot",id:""},{name:"最新",tag:"latest",id:""},{name:"程序员",tag:"show",id:"300"},{name:"分享与发现",tag:"show",id:"16"},{name:"问与答",tag:"show",id:"12"},],
           activeTab:"hot",
           index:0,
           loading:false,
           show:true
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
          let node_id = ""
          this.$data.activeTab=="show" && e.id!=""?node_id=e.id:node_id="0"
          that.$data.loading = true;
          //判断本地缓存是否有数据
          let key = that.$data.activeTab+"-"+node_id;
          let storage = window.localStorage;
           let sstorage = window.sessionStorage ;
          console.log(key) 
          if(sstorage.getItem("welcome") == "end"){
            that.$data.show = false;
          }
          if( storage.getItem(key) == null ) {
            // 从服务器获取数据并写入缓存
            this.$http.get('/api/topics/'+that.$data.activeTab+'.json?node_id='+node_id,{timeout: 1000}).then(function(res){
                    that.$data.list=res.data;
                    //写进本地缓存
                    storage.setItem(key, JSON.stringify(res.data));//对象转字符串
                    sstorage.setItem("welcome","end");//对象转字符串
                    that.$nextTick(function(){
                         that.$data.loading = false;
                         that.$data.show = false;
                      });

            })
          .catch(function(err){
             console.log("请求失败，原因如下："+err);
              that.$data.show = false;
               that.$data.loading = false;
          })
  
          }else{
            //读取本地数据
            that.$data.list = JSON.parse(storage.getItem(key))
           that.$nextTick(function(){
                         that.$data.loading = false;
                      });
          
        }
          
      },
      getBodyHeight:function(){
          let height = document.documentElement.clientHeight;
          this.$data.bodyHeight = height-154+"px";
      }
  }

}
</script>

<style lang="less" scoped>
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
  .vux-flexbox{
    margin-bottom: .5rem;
  }
}
</style>
