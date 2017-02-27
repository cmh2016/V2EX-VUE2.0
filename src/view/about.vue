<template>
<div class="about">
	<x-header></x-header>
	<swiper :aspect-ratio="300/800">
		 <swiper-item class="swiper-demo-img" v-for="item in imgList">
        	<img :src="item">
      	</swiper-item>
      
	</swiper>
		<group>
      		 <cell :title="$t('名称')" :value="$t('V2EX')"></cell>
      		 <cell :title="$t('描述')" :value="$t('way to explore')"></cell>
      		 <cell :title="$t('会员')" :value="$t(info.member_max)"></cell>
      		 <cell :title="$t('主题')" :value="$t(info.topic_max)"></cell>
      	</group>
		<group>
			<cell :title="$t('清除缓存')" @click.native="clear" is-link></cell>
		</group>
		   <confirm @on-confirm="yesClear" confirm-text="是的" cancel-text="再想想" v-model="show" :title="$t('提示')">
      <p style="text-align:center;">{{ $t('你确认清空本地缓存吗?') }}</p>
    </confirm>
     <loading v-model="loading" text="删除中..."></loading>
     <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="清除成功！"></toast>
	<x-footer></x-footer>
</div>
</template>

<script>
import XHeader from 'components/header'
import XFooter from 'components/footer'
import { Swiper,SwiperItem, Cell, Group ,Confirm ,Loading ,Toast } from 'vux'
const imgList = [
  'http://p1.bpimg.com/567571/24f389150c43e02f.jpg',
  'http://p1.bpimg.com/567571/d2ad234e820e5971.jpg'
]
export default {

  name: 'about',
  components:{
  	XHeader,
  	XFooter,
  	Swiper,
  	SwiperItem,
  	Cell,
  	Group,
  	Confirm,
  	Loading,
  	Toast
  },
  data () {
    return {
    	imgList:imgList,
    	info:[],
    	show:false,
    	loading:false,
    	showPositionValue:false

    };
  },
  mounted(){
  	this.getInfo()
  },
  methods:{
  	getInfo(){
  		let that = this
  		this.$http.get('/api/site/stats.json').then(function(res){
              console.log(res)
                    that.$data.info=res.data;
            })
          .catch(function(err){
             console.log("请求失败，原因如下："+err)
            
          })
  	},
  	clear(){
  		this.$data.show=true;
  	},
  	yesClear(){
  		let that = this
  		this.$data.loading=true
  		window.localStorage.clear()
  		setTimeout(function() {
  			that.$data.loading=false
  			that.$data.showPositionValue=true
  		}, 1000);
  		
  	}
  }

};
</script>
 
<style lang="less" scoped>
.swiper-demo-img img {
  width: 100%;
  height: 100%;
}
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 6em;
  color: #04BE02;
}
</style>