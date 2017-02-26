<template>
<div class="node">
 <x-loading v-show="loading"></x-loading>
	<x-header></x-header>
	 <search  v-model.lazy="word" @on-change="getResult" v-show="searchShow" placeholder="搜索主题" cancelText="取消" position="absolute" auto-scroll-to-top top="46px"></search>
	<scroller lock-x height="-100" use-pullup use-pulldown  @on-pulldown-loading="refresh" @on-scroll="" @on-pullup-loading="loadMore" ref="scroller">
      	<div class="contant">
			<cell v-for="item in filteredItems" :title="item.title" :link="{path:'/node_detail',query: { id: item.id }}" :inline-desc='item.header?item.header:"暂无简介"'></cell>
		</div>
    </scroller>
	
	 <div @click.stop="$refs.scroller.reset({top:0})" class="backTop">^</div>
		 <div @click.stop="search" class="searchNode backTop"><icon type="search"></icon></div>
	 <x-footer></x-footer>
</div>
</template>

<script>
import XHeader from 'components/header'
import XFooter from 'components/footer'
import XLoading from "components/loading";
import { Cell ,Search ,Scroller,Icon} from 'vux'
export default {
  name: 'node',
  components:{
  	XHeader,
  	XFooter,
  	Cell,
  	Search,
  	XLoading,
  	Scroller,
  	Icon
  },
  data () {
    return {
    	value:"V2EX",
    	list:[],
      newList:[],
    	loading:false,
    	searchShow:false,
    	word:'',
      page:0
    }
  },
   computed:{
  	filteredItems:function(){
  		return this.$data.newList
  	}

  },
  mounted(){
  	this.gitNode()
  	 this.$nextTick(() => {
      this.$refs.scroller.reset({top: 0})
    })
    this.$data.newList=this.$data.list.slice(0,10)
  },

  methods:{
  	gitNode:function () {
          let that = this  
          //判断本地缓存是否有数据
          let key ="nodeList";
          let storage = window.localStorage;
          if( storage.getItem(key) == null ) {
            // 从服务器获取数据并写入缓存
            that.$data.loading = true;
            this.$http.get('api/nodes/all.json',{timeout: 1000}).then(function(res){
              console.log(res)
                    that.$data.list=res.data;
                    //写进本地缓存
                    storage.setItem(key, JSON.stringify(res.data));//对象转字符串
                    that.$nextTick(function(){
                         that.$data.loading = false;
                      });
            })
          .catch(function(err){
             console.log("请求失败，原因如下："+err);
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
  	search:function(){
  		this.$data.searchShow = !this.$data.searchShow;
  	},
  	getResult:function(){

  	},
  	loadMore:function(){
      this.$data.newList=this.$data.newList.concat(this.$data.list.slice(this.$data.page, this.$data.page+10))
  		this.$data.page+=10
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
      this.$refs.scroller.donePullup()
  	},
    refresh () {
      let that = this;
      let key ="nodeList";
          let storage = window.localStorage;
      this.$http.get('api/nodes/all.json',{timeout: 1000}).then(function(res){
                console.log(res)
                    that.$data.list=res.data;
                    //写进本地缓存
                    storage.setItem(key, JSON.stringify(res.data));//对象转字符串
                    that.$nextTick(() => {
                      that.$refs.scroller.reset()
                    })
                    that.$refs.scroller.donePulldown()
            })
          .catch(function(err){
             console.log("请求失败，原因如下："+err);
              
          })
    }
  }

};
</script>

<style lang="less">
.contant{
	.vux-label-desc{
		display: -webkit-box!important;
		-webkit-box-orient: vertical!important;
		-webkit-line-clamp: 2!important;
		overflow: hidden!important;
		color: #b0b0b0!important;
		font-size: 12px!important;
	}
	
}
.backTop{
		position: fixed;
		right: 5%;
		bottom:80px;
		z-index: 999999;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
		background: rgba(0,0,0,.5);
		color: #fff;
	}
	.searchNode{
		bottom:130px;
	} 
</style>