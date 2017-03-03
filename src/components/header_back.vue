<template lang="html">
    <div>
        <x-header style="background-color:#556;position: fixed;top:0;left:0;width:100vw" :left-options="{showBack: showBack}">{{title}}</x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
    props: {
          title: String
     },
    components:{
        XHeader
    },
    data () {
        return{
            showBack:true
        }
    }
}
</script>

<style lang="css">

</style>