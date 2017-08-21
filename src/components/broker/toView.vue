<template>
  <div>
<!--    <group>
      <cell title="创建订单" link="/index/broker/buy" is-link></cell>
    </group>-->
    <tab :line-width=2 active-color='#fc378c' v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>
    </tab>
    <div>
      <!--下拉刷新上拉加载更多-->
      <!--<page @loadMore="loadMore" @refresh="refresh" :height="'-100'">-->
        <div class="tab-swiper vux-center" v-show="youselfInsurance" style="display: none;" v-for="order in orderList">
          <form-preview header-label="订单号" :header-value="order.id" :body-items="order.orderDetailList" :footer-buttons="order.buttonList" class="orderList"></form-preview><br/>
        </div>

        <div class="tab-swiper vux-center" v-show="youselfPush" style="display: none;" v-for="_order in pushOrderList">
          <form-preview header-label="订单号" :header-value="_order.id" :body-items="_order.orderDetailList"  class="orderList"></form-preview><br/>
        </div><br/><br/>
      <!--</page>-->
    </div>
  </div>
</template>

<script>
    import {Tab, TabItem, Swiper, SwiperItem , FormPreview, Scroller, cookie, Group, Cell} from 'vux'
    import Page from '../kits/page.vue'
    const list = () => ['我的保险', '我的推广']
    export default {
        components: {
          Page,
          Tab,
          TabItem,
          Swiper,
          SwiperItem,
          FormPreview,
          Scroller,
          Group,
          Cell
        },
        created () {
          let vue = this
          vue.updateTitle('全民经纪');
          vue.get({
            url: '/order',
            headers: {
              'token': cookie.get('token')
            },
            success: function (data) {
                for(let i in data.orderList){
                  let item = data.orderList[i]
                  let orderDetailList = [
                    {label: '产品名称', value: (item.insurance_order == null)? "暂未下单" : item.insurance_order.productName},
                    {label: '提交日期', value: item.createdAt},
                    {label: '当前状态', value: item.status}
                  ]
                  let buttonList = []

                  if(item.supplementStatus == true){
                      buttonList = [
                      { style: 'default',text: '补充材料',onButtonClick: (name) => {
                        vue.$router.push('/index/broker/supplement?orderid='+item.id)
                      }},
                      { style: 'default',text: '状态信息',onButtonClick: (name) => {
                        vue.$router.push('/index/broker/stateInfo?state=' + item.status + "&orderid="+item.id)
                      }}
                      ]
                  } else {
                    buttonList = [
                      { style: 'default',text: '状态信息',onButtonClick: (name) => {
                        vue.$router.push('/index/broker/stateInfo?state=' + item.status + "&orderid="+item.id)
                      }}
                    ]
                  }


                  item.orderDetailList = orderDetailList
                  item.buttonList = buttonList
                  vue.$data.orderList.push(item)
                }

                //推广
                for(let i in data.extendOrderList){
                  let item = data.extendOrderList[i]
                  let orderDetailList = [
                    {label: '产品', value: "养老大众基金险"},
                    {label: '提交日期', value: item.createdAt},
                    {label: '当前状态', value: item.status}
                  ]

                  item.orderDetailList = orderDetailList

                  vue.$data.pushOrderList.push(item)
                }
                //清除初始化时候的空数组
                if(!vue.$data.orderList[0].id){
                  vue.$data.orderList.splice(0, 1)
                }

              if(!vue.$data.pushOrderList[0].id){
                vue.$data.pushOrderList.splice(0, 1)
              }
            }
          })
        },
        data () {
            return {
              list2: list(),
              youselfInsurance: true,
              youselfPush: false,
              index: 0,
              orderList:[{}],
              pushOrderList:[{}],
              buttons:''
            }

        },
        methods: {
            //
          replaceBuyreplaceBuy () {
            this.$router.push('/index/broker/buy')
          },
          //TAB切换
          onItemClick(index){
            let vue = this
            if(index === 0){
              vue.$data.youselfInsurance = true
              vue.$data.youselfPush = false
            }else{
              vue.$data.youselfInsurance = false
              vue.$data.youselfPush = true

              //vue.$data.pushOrderList = ""
            }
          },
          //上拉加载
          loadMore () {

          },
          //下拉刷新
          refresh () {

          }
        }
    }
</script>

<style>
*{font-size: 14px;}
.orderList .weui-form-preview__value{font-size: 12px !important;}
/*.weui-form-preview__value{font-size: 16px !important;}*/
</style>
