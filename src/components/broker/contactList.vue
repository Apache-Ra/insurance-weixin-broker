<template>
<div>

  <div class="weui-gallery" style="display: block; opacity: 1;" v-if="preViewShow">
    <span class="weui-gallery__img"><img :src="reViewMaxImg" class="mbay-img" style="position: relative;margin-top: 25%"></span>
    <div class="weui-gallery__opr" @click="closePreview">关闭</div>
  </div>

  <grid :rows="rowsList">
    <div v-for="item in itemList">
      <grid-item :label="item.servicesName" class="contactImg">
        <img slot="icon" :src="item.servicesCode" @click="preView(item.servicesCode)">
      </grid-item>
    </div>
  </grid>
</div>
</template>

<script>
    import { Grid, GridItem, GroupTitle } from 'vux'
    export default {
        components: {
          Grid,
          GridItem,
          GroupTitle
        },
        created () {
          let vue = this
          vue.updateTitle('客服列表');
          let data = require('../../assets/data/services.json')
          for(let i in data.servicesList){
            let item = data.servicesList[i]
            let obj = {
              servicesName:item.servicesName,
              servicesCode:item.servicesCode
            }
            vue.$data.itemList.push(obj)
          }
        },
        data () {
            return {
              preViewShow:false,
              reViewMaxImg:'./static/img/policy_code.jpg',
              rowsList:2,
              itemList:[]
            }
        },
        methods: {
          preView (QRcode){
            let vue = this
            vue.$data.reViewMaxImg = QRcode
            vue.$data.preViewShow = true
            console.log(QRcode)
          },
          closePreview () {
            let vue = this
            vue.$data.preViewShow = false
          }
        }
    }
</script>

<style>
  .contactImg .weui-grid__icon{width: 160px !important;height:160px !important;}
  .weui-gallery {position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: #000000;z-index: 1500;overflow: hidden;width: 100%;height: 100%;outline: none;touch-action: none;}
  .weui-gallery__img {position: absolute;top: 0;right: 0;bottom: 60px;left: 0;background: center center no-repeat;background-size: contain;}
  .weui-gallery__opr {position: absolute;right: 0;bottom: 0;left: 0;background-color: #0D0D0D;color: #FFFFFF;line-height: 60px; text-align: center;}
  .weui-gallery__del {display: block;}
  .mbay-img{max-width: 100%;}
</style>
