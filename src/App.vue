<template>
  <div>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">

@import '~vux/src/styles/reset.less';
.fade-enter-active, .fade-leave-active{
 -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  transition: all 0.3s ease;

}
.fade-enter, .fade-leave-active{
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
}
.fold-enter-active {
  animation-name: fold-in .5s;
}
.fold-leave-active {
  animation-name: fold-out .5s;
}
@keyframes fold-in {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  from {
     -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
}
</style>
