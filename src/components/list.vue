<template>
 <div>
 	<flexbox v-for="item in list">
     <flexbox-item :span="2"> <router-link :to="{ path: '/user', query: { username: item.member.username }}"><img  :src="item.member.avatar_normal" alt=""></router-link></flexbox-item>
     <flexbox-item>
     <router-link :to="{ path: '/detail', query: { id: item.id }}"><h2  class="title" v-text="item.title"></h2><span class="reply" v-text="item.replies"></span></router-link>
     
       <flexbox :gutter="5">
       <flexbox-item :span="3">
        <router-link :to="{ path: '/node_detail', query: { id: item.node.id }}"><span  class="tag" v-text="item.node.title"></span></router-link>
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
	
</template>

<script>
import {Flexbox,FlexboxItem} from 'vux'
export default {
	props: {
          list: Array
     },
       components: {
    Flexbox,
    FlexboxItem
  },
  name: 'list',

  data () {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../assets/common.less';
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
</style>