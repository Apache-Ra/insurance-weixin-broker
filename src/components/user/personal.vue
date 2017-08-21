<template>
  <div>

    <swiper loop auto :list="bannerList" :index="broker_index"></swiper>

    <grid :rows="2">
      <grid-item link="/index/user/userInfo" :label="('个人信息')">
        <img slot="icon" src="../../assets/img/user/grxx.png">
      </grid-item>
      <grid-item :label="('推广信息')" @on-item-click="push">
        <img slot="icon" src="../../assets/img/user/tgxx.png">
      </grid-item>
      <grid-item :label="('奖励信息')" @on-item-click="reward">
        <img slot="icon" src="../../assets/img/user/jlxx.png">
      </grid-item>
      <grid-item link="/index/user/new" :label="('最新信息')">
        <img slot="icon" src="../../assets/img/user/zxxx.png">
        <badge :text="number" class="badge" v-if="number > 0"></badge>
      </grid-item>
    </grid>

    <!--<group>-->
      <!--<cell title="最新公告">-->
        <!--<marquee>-->
          <!--<marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">{{ ('保单无忧，全程无忧')}} {{i}}</marquee-item>-->
        <!--</marquee>-->
      <!--</cell>-->
    <!--</group>-->
  </div>
</template>

<script>
  import {Group, Badge, Swiper, Grid, GridItem, GroupTitle, Marquee, MarqueeItem, Cell, cookie} from 'vux'

  export default {
    components: {
      Group,
      Badge,
      Swiper,
      Grid,
      GridItem,
      GroupTitle,
      Marquee,
      MarqueeItem,
      Cell
    },
    created () {
      let vue = this
      vue.updateTitle('我的信息')

      let banner = require('../../../src/assets/data/banner.json')
      for(let i in banner.messageBanner){
        let item = banner.messageBanner[i]
        let obj = {
          "url": item.url,
          "img": item.img,
          "title": item.title
        }
        vue.$data.bannerList.push(obj)
      }

      vue.get({
        url:'/news/findStatus',
        headers:{'token':cookie.get('token')},
        success:function (data) {
          vue.$data.number = data.number.toString()
        }
      })
    },
    mounted () {
      setTimeout(() => {
        this.asyncCount = 5
      }, 1000)
    },
    data () {
      return {
        asyncCount: 0,
        broker_index: 0,
        number:'',
        bannerList: []
      }
    },
    methods: {
      onClick (i) {

      },
      //推广信息
      push () {
        let vue = this
        vue.register('/index/user/push')
      },
      //奖励信息
      reward () {
        let vue = this
        vue.register('/index/user/reward')
      },
      //判断是否注册
      register (thisUrl) {
        let vue =this
        vue.get({
          url: '/broker',
          headers:{'token':cookie.get('token')},
          success:function (data) {
            if(data.isBroker === '审核通过'){
              vue.$router.push(thisUrl)
            } else if(data.isBroker === '审核中'){
              vue.$vux.toast.show({
                isShowMask:true,
                type:'cancel',
                text: '全民经纪审核中',
                width:'12em',
                position:'default',
                onHide () {

                }
              })
            } else {
              vue.$vux.toast.show({
                isShowMask:true,
                type:'cancel',
                text: '请先注册全民经纪',
                width:'12em',
                position:'default',
                onHide () {
                  vue.$router.push('/index/broker/register')
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style>
  *{font-size: 14px}
  .badge{position: absolute;
    top:12px;
    right:70px;}
</style>
