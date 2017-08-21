<template>
  <div>

    <swiper loop auto :list="bannerList" :index="broker_index"></swiper>

    <grid>
      <grid-item link="/index/policy/policyList" :label="('查看保单')">
        <img slot="icon" src="../../assets/img/policy/ckbd.png">
      </grid-item>
      <grid-item link="/index/policy/create" :label="('保单托管')">
        <img slot="icon" src="../../assets/img/policy/bdtg.png">
      </grid-item>
      <grid-item link="/index/policy/policyInfo" :label="('预约服务')">
        <img slot="icon" src="../../assets/img/policy/yykf.png">
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import {Swiper, Grid, GridItem, GroupTitle, cookie} from 'vux'

  export default {
    components: {
      Swiper,
      Grid,
      GridItem,
      GroupTitle
    },
    created () {
      let vue = this
      vue.updateTitle('保单无忧');
      //
      let banner = require('../../../src/assets/data/banner.json')
      for(let i in banner.policyBanner){
          let item = banner.policyBanner[i]
          let obj = {
            "url": item.url,
            "img": item.img,
            "title": item.title
          }
        vue.$data.bannerList.push(obj)
      }
    },
    data () {
      return {
        broker_index: 0,
        bannerList: []
      }
    },
    methods: {
    }
  }
</script>

<style>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
</style>
