<template>
  <div style="height:100%;">
    <top style="margin-bottom:46px"></top>
    <transition>
      <router-view></router-view>
    </transition>
    <bottom></bottom>
  </div>
</template>

<script>
  import Top from './layouts/top.vue'
  import Bottom from './layouts/bottom.vue'

  export default {
    components: {
      Top,
      Bottom
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
