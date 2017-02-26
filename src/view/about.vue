<template>
<div class="about">
	<x-header></x-header>
	about
	 <x-footer></x-footer>
</div>
</template>

<script>
import XHeader from 'components/header'
import XFooter from 'components/footer'
export default {

  name: 'about',
  components:{
  	XHeader,
  	XFooter
  },
  data () {
    return {

    };
  }

};
</script>

<style lang="less" scoped>

</style>