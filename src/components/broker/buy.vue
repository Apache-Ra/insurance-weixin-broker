<template>
<div>
  <swiper loop auto :list="bannerList" :index="broker_index"></swiper>
  <group  title="购买保险">
    <grid>
      <grid-item link="/index/broker/programmeInfo" :label="('获取方案')">
        <img slot="icon" src="static/img/broker/menu/hqfa.png">
      </grid-item>
      <grid-item :label="('保险下单')" @on-item-click="insuranceOrder">
        <img slot="icon" src="static/img/broker/menu/bxxd.png">
      </grid-item>
      <grid-item :label="('预约赴港')" @on-item-click="subscribeInfo">
        <img slot="icon" src="static/img/broker/menu/yyfg.png">
      </grid-item>
      <grid-item :label="('上传保单')" @on-item-click="policyInfo">
        <img slot="icon" src="static/img/broker/menu/scbd.png">
      </grid-item>
      <grid-item link="/index/broker/buyingGuide" :label="('购买指南')">
        <img slot="icon" src="static/img/broker/menu/gmzn.png">
      </grid-item>
      <grid-item :label="('查看保险')" @on-item-click="toView">
        <img slot="icon" src="static/img/broker/menu/ckbx.png">
      </grid-item>
    </grid>
  </group>

  <group  title="推广保险">
    <grid>
      <grid-item :label="('推广保险')" @on-item-click="brokerPush">
        <img slot="icon" src="static/img/broker/menu/tgbx.png">
      </grid-item>
      <grid-item :label="('推广效果')" @on-item-click="userPush">
        <img slot="icon" src="static/img/broker/menu/tgxg.png">
      </grid-item>

    </grid>
  </group>

</div>
</template>

<script>
  import {Group, Toast, Swiper, Grid, GridItem, GroupTitle, cookie} from 'vux'

    export default {
        components: {
          Group,
          Swiper,
          Grid,
          GridItem,
          GroupTitle
        },
        created () {
          let vue = this
          vue.updateTitle('全民经纪');
          //
          let banner = require('../../../src/assets/data/banner.json')
          for(let i in banner.brokerBanner){
            let item = banner.brokerBanner[i]
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
              telNumber:'64186988',
              broker_index: 0,
              bannerList: []
            }
        },
        methods: {
          //保险下单
          insuranceOrder () {
            let vue = this
            vue.register('/index/broker/insuranceOrder')
          },
          //预约赴港
          subscribeInfo () {
            let vue = this
            vue.register('/index/broker/subscribeInfo')
          },
          //上传保单
          policyInfo () {
            let vue = this
            vue.register('/index/broker/policyInfo')
          },
          // 查看保险
          toView () {
            let vue = this
            vue.register('/index/broker/toView')
          },
          //推广效果
          userPush () {

            let vue = this
            vue.register('/index/user/push')
          },
          //推广保险
          brokerPush () {
            let vue = this
            vue.register('/index/broker/push')
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
                }else if(data.isBroker === '审核中'){
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
          },
          //联系客服
          onClick () {
            window.location.href = 'tel:'+this.$data.telNumber
          }
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
