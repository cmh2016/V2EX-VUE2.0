<template>
  <div>
    <tabbar>
      <tabbar-item @on-item-click="tabbar(item)" v-for="item in footNav" :selected="active===item.name">
        <img slot="icon" :src="item.img">
        <span slot="label">{{item.name}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    name: 'footer',
  components: {
    Tabbar,
    TabbarItem
  },
  data(){
    return{
      footNav:[
        {name:"文章",url:"/",img:"http://p1.bqimg.com/567571/806d530419f42fcd.png"},
        {name:"主题",url:"/node",img:"http://p1.bpimg.com/567571/66f9456883a7685b.png"},
        {name:"关于",url:"/about",img:"http://i1.piimg.com/567571/29ace762efd4fa07.png"}
      ],
      active:""
    }
  },
  mounted(){
    this.fetchData()
  },
  methods:{
    tabbar:function (item) {
      this.$router.push({ path: item.url })
      let storage = window.sessionStorage;
      storage.setItem("footerNavActive", item.name);
    },
    fetchData:function(){
      let storage = window.sessionStorage;
       let active = storage.getItem("footerNavActive");
       active?this.$data.active = active:this.$data.active = "文章";
  
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
}
</script>
