<template>
  <div>
    <tab :line-width=2 active-color='#fc378c' v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>
    </tab>
    <div>
      <div class="tab-swiper vux-center" v-show="youselfOrder" style="display: none;" v-for="order in orderList">
        <form-preview :header-label="order.title" :header-value="order.value" :body-items="order.orderDetailList" class="insurance" :footer-buttons="order.buttonList" ></form-preview><br/>
      </div>

      <div class="tab-swiper vux-center" v-show="youselfSubscribe" style="display: none;" v-for="subscribe in subscribeList">
        <form-preview :header-label="subscribe.title" :header-value="subscribe.value" :body-items="subscribe.subscribeDetailList" class="insurance"></form-preview><br/>
      </div>
      <load-more :show-loading="false" v-if="insuranceDatas" :tip="('暂无数据')" background-color="#fbf9fe"></load-more>

    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem , FormPreview, Scroller, cookie, Group, Cell, LoadMore} from 'vux'
  const list = () => [ '我的订单', '我的预约']
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
      LoadMore
    },
    created () {
      let vue = this
      vue.updateTitle('预约赴港')

      vue.get({
        url: '/appointment/findAllStatus',
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
                  { style: 'default',text: '预约赴港',onButtonClick: (name) => {
                    vue.$router.push('/index/broker/subscribe?orderId=' + item.id)
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
        youselfSubscribe: false,
        index: 0,
        orderList:[{}],
        subscribeList:[{}],
        buttons:''
      }
    },
    methods: {
      replaceBuyreplaceBuy () {
        this.$router.push('/index/broker/buy')
      },
      //TAB切换
      onItemClick(index){
        let vue = this
        if(index === 0){
          vue.$data.youselfOrder = true
          vue.$data.youselfSubscribe = false
        }else{
          vue.$data.subscribeList = [{}]
          vue.$data.youselfOrder = false
          vue.$data.youselfSubscribe = true

          vue.get({
            url: '/appointment/findAll',
            headers: {'token': cookie.get('token')},
            success: function (data) {
              if(data.appointmentList.length == 0){
                  vue.$data.subscribeList = ""
              }else {
                for(let i in data.appointmentList){
                  let item = data.appointmentList[i]
                  let true_false = (item.whetherOpenAccount == true) ? '是': '否'

                  let _null = (item.openAccountType == null) ? '暂无' : item.openAccountType
                  let null_ = (item.openAccountBank == "") ? '暂无' : item.openAccountBank
                  let subscribeDetailList = [
                    {label: '航班号',value: item.flightNumber},
                    {label: '航班日期',value: item.flightDate},
                    {label: '随行人员数',value: item.peoples},
                    {label: '是否需要香港开户',value: true_false},
                    {label: '开户类别',value: _null},
                    {label: '开户银行',value: null_},
                    {label: '审核状态',value: item.status}
                  ]
                  item.subscribeDetailList = subscribeDetailList
                  item.title = '预约单号'
                  item.value = item.id

                  vue.$data.subscribeList.push(item)

                  if(!vue.$data.subscribeList[0].id){
                    vue.$data.subscribeList.splice(0, 1)
                  }
                }
              }
            }
          })
        }
      },
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
