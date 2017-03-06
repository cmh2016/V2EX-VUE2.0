<template>
    <div class="node_detail">
        <loading v-model="show" text="加载中.."></loading>
        <x-header :title='title'></x-header>
        <div v-show="!show" class="box">
            <img class="bg" :src="info.avatar_large" alt="">
            <div class="zz"></div>
            <img :src="info.avatar_large" alt="" class="userPic">
            <div class="info">
                <p>主题：{{info.title?info.title:'暂无'}}</p>
                <p>描述：{{info.header?info.header:'暂无'}}</p>
                <p>主题总数：{{info.topics?info.topics:'暂无'}}</p>
                <p>创建时间：{{info.created | time}}</p>
            </div>
            <div class="list">
                <p>主题文章</p>
                <x-list :list="list"></x-list>
            </div>
        </div>
    </div>
</template>
<script>
import XHeader from 'components/header_back'
import { Loading} from 'vux'
import XList from "components/list";
export default {

    name: 'node_detail',
    components: {
        XHeader,
        Loading,
        XList
    },

    data() {
        return {
            info: [],
            list: [],
            title: '主题详情',
            show: true,
            author: ''

        };
    },
    beforeRouteEnter(to, from, next) {
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
        getInfo: function() {

            let that = this

            function getNodeInfo() {
                return that.$http.get('/api/nodes/show.json?id=' + that.$route.query.id);
            }

            function getNodeList() {
                return that.$http.get('/api/topics/show.json?node_id=' + that.$route.query.id);
            }
            that.$http.all([getNodeInfo(), getNodeList()])
                .then(that.$http.spread(function(info, list) {
                    console.log(info.data)
                        // 两个请求现在都执行完成
                    that.$data.info = info.data;
                    that.$data.list = list.data;


                    that.$nextTick(function() {
                        that.$data.show = false;
                    })
                }));


        }
    }
};
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../assets/common.less';
.box {
    width: 100vw;
    height: 320px;
    margin-top: 45px;
    position: relative;
    .bg {
        width: 100vw;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 12;
        top: 0;
        -webkit-filter: blur(15px);
        /* Chrome, Opera */
        filter: blur(15px);
    }
    .zz {
        width: 100vw;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 33;
        background-color: rgba(0, 0, 0, .5);
    }
    .userPic {
        position: absolute;
        top: 30px;
        left: 40%;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        z-index: 6666;
    }
    .info {
        position: absolute;
        top: 110px;
        left: 10%;
        text-align: left;
        font-size: .8rem;
        color: #fff;
        z-index: 999;
    }
    .list {
        position: relative;
        top: 350px;
        left: 2.5%;
        z-index: 666;
        width: 95%;
    }
}
</style>
