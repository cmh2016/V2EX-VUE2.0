<template>
  <div>
  <transition name="fade">
    <router-view></router-view>
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

  transition: all 0.5s ease     
}
.fade-enter, .fade-leave-active{
  opacity: 0
}
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
  transition: all 0.5s ease
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
  transition: all 0.5s ease
}
@keyframes fold-in {
  0% {
    transform: translate3d(100%, 0, 0);

  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
