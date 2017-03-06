<template>
    <div class="node">
        <x-loading v-show="loading"></x-loading>
        <x-header></x-header>
        <search @on-result-click="clickResuilt" v-model.lazy="word" :results="results" @on-change="getResult" v-show="searchShow" placeholder="搜索主题" cancelText="取消" position="absolute" auto-scroll-to-top></search>
        <scroller lock-x height="-100" use-pullup use-pulldown @on-pulldown-loading="refresh" @on-scroll="" @on-pullup-loading="loadMore" ref="scroller">
            <div class="contant">
                <group>
                    <cell v-for="item in filteredItems" :title="item.title" :link="{path:'/node_detail',query: { id: item.id }}" :inline-desc='item.header?item.header:"暂无简介"'></cell>
                </group>
            </div>
        </scroller>
        <alert v-model="alert" title="温馨提示" button-text="确认">{{text}}</alert>
        <div @click.stop="$refs.scroller.reset({top:0})" class="backTop">^</div>
        <div @click.stop="search" class="searchNode backTop">
            <icon type="search"></icon>
        </div>
        <x-footer></x-footer>
    </div>
</template>
<script>
import XHeader from 'components/header'
import XFooter from 'components/footer'
import XLoading from "components/loading";
import { Cell, Search, Scroller, Icon,Alert, Group} from 'vux'
export default {
    name: 'node',
    components: {
        XHeader,
        XFooter,
        Cell,
        Search,
        XLoading,
        Scroller,
        Icon,
        Alert,
        Group
    },
    data() {
        return {
            value: "V2EX",
            list: [],
            newList: [],
            loading: false,
            searchShow: false,
            word: '',
            page: 10,
            alert: false,
            text: '',
            results: [],
            searchData: []
        }
    },
    computed: {
        filteredItems: function() {
            return this.$data.newList
        }

    },
    mounted() {
        this.gitNode()
        this.$nextTick(() => {
            this.$refs.scroller.reset({
                top: 0
            })
        })
        let that = this
        let obj = {}
        for (let i = 0; i < that.$data.list.length; i++) {
            obj.name = that.$data.list[i].title
            obj.id = that.$data.list[i].id
            that.$data.searchData.push(obj)
            obj = {}
        }
        console.log(this.$data.searchData)
    },

    methods: {
        gitNode: function() {
            let that = this
                //判断本地缓存是否有数据
            let key = "nodeList";
            let storage = window.localStorage;
            if (storage.getItem(key) == null) {
                // 从服务器获取数据并写入缓存
                that.$data.loading = true;
                this.$http.get('api/nodes/all.json', {
                        timeout: 1000
                    }).then(function(res) {
                        console.log(res)
                        that.$data.list = res.data;
                        //写进本地缓存
                        storage.setItem(key, JSON.stringify(res.data)); //对象转字符串
                        that.$nextTick(function() {
                            that.$data.loading = false;
                        });
                        that.$data.newList = that.$data.newList.concat(that.$data.list.slice(0, 10))

                    })
                    .catch(function(err) {
                        console.log("请求失败，原因如下：" + err)
                        that.$data.text = '请求失败，原因如下' + err
                        that.$data.alert = true
                        that.$data.loading = false
                    })

            } else {
                //读取本地数据
                that.$data.list = JSON.parse(storage.getItem(key))
                that.$nextTick(function() {
                    that.$data.loading = false;
                });
                that.$data.newList = that.$data.newList.concat(this.$data.list.slice(0, 10))
            }
        },
        search: function() {
            this.$data.searchShow = !this.$data.searchShow;
        },
        getResult(val) {
            console.log(val)
            this.results = val ? this.searchNodes(val) : []
        },
        clickResuilt: function(item) {
            //window.alert('you click the result item: ' + JSON.stringify(item))
            this.$router.push({
                path: '/node_detail',
                query: {
                    id: item.id
                }
            })
        },
        loadMore: function() {
            this.$data.newList = this.$data.newList.concat(this.$data.list.slice(this.$data.page, this.$data.page + 10))
            if (this.$data.page <= this.$data.list.length) {
                this.$data.page += 10
                this.$nextTick(() => {
                    this.$refs.scroller.reset()
                })
                this.$refs.scroller.donePullup()
            } else {
                console.log("over")
                this.$data.text = '已经全部加载了哦'
                this.$data.alert = true
                this.$refs.scroller.disablePullup()
                return false
            }
            console.log(this.$data.page)

        },
        refresh() {
            let that = this;
            let key = "nodeList";
            let storage = window.localStorage;
            this.$http.get('api/nodes/all.json', {
                    timeout: 1000
                }).then(function(res) {
                    console.log(res)
                    that.$data.list = res.data;
                    //写进本地缓存
                    storage.setItem(key, JSON.stringify(res.data)); //对象转字符串
                    that.$nextTick(() => {
                        that.$refs.scroller.reset()
                    })
                    that.$data.text = '更新成功！'
                    that.$data.alert = true
                    that.$refs.scroller.donePulldown()
                })
                .catch(function(err) {
                    console.log("更新失败，原因如下：" + err)
                    that.$data.text = '更新失败，原因如下' + err
                    that.$data.alert = true
                    that.$refs.scroller.donePulldown()
                })
        },
        searchNodes: function(val) {
            let rs = []
            let name = ''
            let searchResults = this.filter(val)
            if (searchResults.length > 0) {
                for (let i = 0; i < searchResults.length; i++) {
                    rs.push({
                        title: searchResults[i].name,
                        id: searchResults[i].id
                    })
                }
            } else {
                rs.push({
                    title: `您输入的 ${val} 暂无此主题`
                })
            }


            return rs
        },
        filter: function(val) {

            return this.$data.searchData.filter(function(el) {
                console.log(el.name)
                return el.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            })
        }
    }

}
</script>
<style lang="less">
.node {
    overflow: hidden;
}

.contant {
    .vux-label-desc {
        display: -webkit-box!important;
        -webkit-box-orient: vertical!important;
        -webkit-line-clamp: 2!important;
        overflow: hidden!important;
        color: #b0b0b0!important;
        font-size: 12px!important;
    }
}

.backTop {
    position: fixed;
    right: 5%;
    bottom: 80px;
    z-index: 999999;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .5);
    color: #fff;
}

.searchNode {
    bottom: 130px;
}

.vux-search-fixed {
    height: 100%;
}

.weui-cells.vux-search_show {
    height: 90%;
    overflow-y: scroll!important;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    transition: all .5s;
}
</style>
