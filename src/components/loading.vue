<template>
	<div class="loading-box">
		<img src="../assets/loading.gif" alt="">
	</div>
</template>

<script>
export default {

  name: 'loading',

  data () {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
.loading-box{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.9);
	position: fixed;
	z-index: 9999999;
	img{
		width:140px;
		position: absolute;
		left: 50%;
		top:35%;
		margin-left: -70px;
	}
}
</style>