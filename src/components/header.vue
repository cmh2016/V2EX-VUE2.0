<template lang="html">
    <div>
        <x-header style="background-color:#556;" :left-options="{showBack: showBack}">V2EX</x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
    components:{
        XHeader
    },
    data () {
        return{
            showBack:false
        }
    }
}
</script>

<style lang="css">

</style>
