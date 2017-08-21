<template>
  <div>
    <!--<tab :line-width=2 active-color='#fc378c' v-model="index">-->
      <!--<tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>-->
    <!--</tab>-->
    <div>
      <div class="tab-swiper vux-center" v-show="youselfOrder" style="display: none;" v-for="order in orderList">
        <form-preview :header-label="order.title" :header-value="order.value" :body-items="order.orderDetailList" class="insurance" :footer-buttons="order.buttonList" ></form-preview><br/>
      </div>

      <!--<div class="tab-swiper vux-center" v-show="youselfUpdate" style="display: none;">-->
        <!--<preview :previewList="previewList"></preview>-->
      <!--</div>-->
      <load-more :show-loading="false" v-if="insuranceDatas" :tip="('暂无数据')" background-color="#fbf9fe"></load-more>

    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem , FormPreview, Scroller, cookie, Group, Cell, LoadMore} from 'vux'
  import Preview from '../kits/preview.vue'

  const list = () => [ '我的订单', '我的上传']
  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      FormPreview,
      Scroller,
      Group,
      Cell,
      Preview,
      LoadMore
    },
    created () {
      let vue = this
      vue.updateTitle('上传保单')

      vue.get({
        url: '/uploadPolicy/findAllStatus',
        headers: {'token': cookie.get('token')},
        success: function (data) {
          if(data.orderList.length == 0){
            vue.$data.orderList = ""
          }else {
            for(let i in data.orderList){

              let item = data.orderList[i]

              let orderDetailList = [
                {label: '订单状态',value: item.status},
                {label: '创建时间',value: item.createdAt}
              ]

              let buttonList = [
                { style: 'default',text: '上传保单',onButtonClick: (name) => {
                  vue.$router.push('/index/broker/uploadPolicy?orderId=' + item.id)
                }}]

              item.orderDetailList = orderDetailList
              item.buttonList = buttonList
              item.title = '订单号'
              item.value = item.id
              vue.$data.orderList.push(item)

              if(!vue.$data.orderList[0].id){
                vue.$data.orderList.splice(0, 1)
              }
            }
          }
        }
      })

    },
    data () {
      return {
        cellTitle:'直接下单',
        cellValue:'',
        insuranceDatas:false,
        list2: list(),
        youselfOrder: true,
        youselfUpdate: false,
        index: 0,
        orderList:[{}],
        previewList:[{}],
        buttons:''
      }
    },
    methods: {
      replaceBuyreplaceBuy () {
        this.$router.push('/index/broker/buy')
      },
      //TAB切换
//      onItemClick(index){
//        let vue = this
//        if(index === 0){
//          vue.$data.youselfOrder = true
//          vue.$data.youselfUpdate = false
//        }else{
//          vue.$data.updateList = [{}]
//          vue.$data.youselfOrder = false
//          vue.$data.youselfUpdate = true
//
//          vue.get({
//            url: '/uploadPolicy/findAll',
//            headers: {'token': cookie.get('token')},
//            success: function (data) {
//              for(let i in data.uploadPolicyList) {
//                let item = data.uploadPolicyList[i]
//                vue.$data.previewList.push({src: vue.serverName + item.img})
//              }
//              if(!vue.$data.previewList[0].id){
//                vue.$data.previewList.splice(0, 1)
//              }
//            }
//          })
//        }
//      },
      //数据请求
      getData(){

      }
    }
  }
</script>

<style>
  *{font-size: 14px;}
  .insurance em{font-size: 12px !important;}
</style>
