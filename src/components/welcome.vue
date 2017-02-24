<template>
	<div class="welcome">
		<img src="../assets/loading-icon.gif" height="30" width="30" alt="" class="loading-icon">
	</div>
</template>

<script>
export default {

  name: 'welcome',

  data () {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
.welcome{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: url(../assets/welcome.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	z-index: 999999999999;
	overflow: hidden;
	// animation: welcome 1s;
	.loading-icon{
		position: absolute;
		bottom: 100px;
		left: 50%;
		margin-left: -15px;
		z-index:999999999999999 ;
	}
	@-webkit-keyframes welcome {
		from { background-size: 100% 100% }
		to { background-size: 110% 110% }
	}
	@-o-keyframes welcome {
		from { background-size: 100% 100% }
		to { background-size: 110% 110% }
	}
	@-moz-keyframes welcome {
		from { background-size: 100% 100% }
		to { background-size: 110% 110% }
	}
	@keyframes welcome {
		from { background-size: 100% 100% }
		to { background-size: 110% 110% }
	}
}
</style>