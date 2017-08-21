<template>
    <div>
      <swiper loop auto :list="bannerList" :index="broker_index"></swiper>
      <div>

       <div style="margin:10px 0;overflow-y: hidden;" v-for="item in pushList">
          <masker style="border-radius: 0;" @click.native="pushDetail(item.activeId)">
          <div class="m-img" :style="{backgroundImage: 'url(' + item.activeImg + ')'}"></div>
          <div slot="content" class="m-title">
            {{item.activeTit}}
            <br/>
            <span class="m-time">{{item.activeTime}}</span>
          </div>
        </masker>
      </div>
    </div>
  </div>
</template>


<script>
  import {Swiper, Masker, cookie} from 'vux'

  export default {
        components: {
          Swiper,
          Masker
        },
        created () {
          let vue = this
          vue.updateTitle('推广保险')
          //推广保险LIST
          let brokerPush = require('../../../src/assets/data/brokerPushList.json')
          //Banner
          for(let i in brokerPush.pushBanner){
            let item = brokerPush.pushBanner[i]
            let obj = {
              url: item.pushUrl+item.pushNumber,
              img: item.bannerImg,
              title: item.bannerTit
            }
            vue.$data.bannerList.push(obj)
          }
          //推广List
          for(let j in brokerPush.pushList){
            let item = brokerPush.pushList[j]
            let obj = {
              activeImg:item.pushImg,
              activeId:item.pushNumber,
              activeTit:item.pushTit,
              activeTime:item.pushTime
            }
            //console.log(obj)
            vue.$data.pushList.push(obj)
          }
          /**
           * 取出inviitation
           */
          vue.$data.invitation = cookie.get('invitation')
        },
        data () {
            return {
              broker_index: 0,
              pushList: [],
              bannerList:[],
              invitation:''
            }
        },
        methods: {
          pushDetail (id) {
            let vue = this
            //vue.$router.push('/index/broker/pushDetailShare?pushNumber='+id+'&inviitation='+inviitation)
            vue.$router.push('/pushDetailShare?pushNumber='+id+'&invitation='+vue.$data.invitation)
          }
        }
    }
</script>

<style>
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
