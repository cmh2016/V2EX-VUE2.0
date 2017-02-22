<template>
  <div>
    <tabbar>
      <tabbar-item selected  link="/">
        <img slot="icon" src="../assets/nav01.png">
        <span slot="label">文章</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/nav02.png">
        <span slot="label">主题</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/nav03.png">
        <span slot="label">网站</span>
    </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    name: 'footer',
  components: {
    Tabbar,
    TabbarItem

  }
}
</script>
