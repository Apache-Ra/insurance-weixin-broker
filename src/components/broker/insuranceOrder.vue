<template>
  <div>
    <group>
      <cell :title="cellTitle" :value="cellValue" link="/index/broker/order"></cell>
    </group>
    <tab :line-width=2 active-color='#fc378c' v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>
    </tab>
    <div>

      <div class="tab-swiper vux-center" v-show="youselfProgramme" style="display: none;" v-for="programme in programmeList">
        <form-preview :header-label="programme.title" :header-value="programme.value" :body-items="programme.programmeDetailList" :footer-buttons="programme.buttonList" class="insurance"></form-preview><br/>
      </div>

      <div class="tab-swiper vux-center" v-show="youselfInsurance" style="display: none;" v-for="order in orderList">
        <form-preview :header-label="order.title" :header-value="order.value" :body-items="order.orderDetailList" class="insurance"></form-preview><br/>
      </div>

      <load-more :show-loading="false" v-if="insuranceDatas" :tip="('暂无数据')" background-color="#fbf9fe"></load-more>

    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem , FormPreview, Scroller, cookie, Group, Cell, LoadMore} from 'vux'
  const list = () => [ '我的方案','保险下单']
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
      vue.updateTitle('保险下单')

      vue.get({
        url:'/insuranceOrder/findAllStatus',
        headers:{'token': cookie.get('token')},
        success:function (data) {
          if(data.programmeList.length == 0){
            vue.$data.youselfInsurance = false
            vue.$data.youselfProgramme = true
            vue.$data.insuranceDatas = false
            vue.$data.programmeList = ""


          }else {
            vue.$data.youselfProgramme = true
            vue.$data.insuranceDatas = false
            vue.$data.youselfInsurance = false

            for(let i in data.programmeList){
                let item = data.programmeList[i]
                let programmeDetailList = [
                  {label: '受保人',value: item.insurant},
                  {label: '性别',value: item.product},
                  {label: '产品类别',value: item.product},
                  {label: '预算范围',value: item.budget},
                  {label: '提交时间',value: item.createdAt}]

              let buttonList = [
                { style: 'default',text: '方案下单',onButtonClick: (name) => {
                  vue.$router.push('/index/broker/order?orderId=' + item.orderId)
                }}]

              item.programmeDetailList = programmeDetailList
              item.buttonList = buttonList
              item.title = '订单号'
              item.value = item.orderId
              vue.$data.programmeList.push(item)

              if(!vue.$data.programmeList[0].id){
                vue.$data.programmeList.splice(0, 1)
              }
              console.log(vue.$data.programmeList)
            }
          }
        }
      })

    },
    data () {
      return {
        cellTitle:'直接下单',
        cellValue:'',
        insuranceDatas:true,
        list2: list(),
        youselfInsurance: true,
        youselfProgramme: false,
        index: 0,
        orderList:[{}],
        programmeList:[{}],
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
          vue.$data.youselfInsurance = false
          vue.$data.youselfProgramme = true
        }else{
          vue.$data.orderList = [{}]
          vue.$data.youselfInsurance = true
          vue.$data.youselfProgramme = false

          vue.get({
            url: '/insuranceOrder/findAll',
            headers: {'token': cookie.get('token')},
            success: function (data) {
              if(data.insuranceOrderList.length == 0){
                  vue.$data.orderList = ""
              }else {
              for(let i in data.insuranceOrderList){
                let item = data.insuranceOrderList[i]

                let true_false = (item.applicantSmoke == true) ? '是': '否'
                let _true_false = (item.insurantSmoke == true) ? '是': '否'

                let orderDetailList = [
                  {label: '保险公司',value: item.insuranceCompany},
                  {label: '产品名称',value: item.productName},
                  {label: '保费',value: item.dollar},
                  {label: '付费年限',value: item.paidYears},
                  {label: '是否吸烟',value: true_false},
                  {label: '投保人',value: item.applicant},
                  {label: '投保人性别',value: item.applicantSex},
                  {label: '投保人国籍',value: item.applicantNatinoality},
                  {label: '投保人年龄',value: item.applicantAge},
                  {label: '身份证号码',value: item.applicantId},
                  {label: '港澳通行证号码',value: item.applicantPermit},
                  {label: '护照号码',value: item.applicantPassport},
                  {label: '公司名称',value: item.applicantCompany},
                  {label: '公司地址',value: item.applicantCompanyAddress},
                  {label: '职务',value: item.applicantJob},
                  {label: '职位',value: item.applicantPosition},
                  {label: '年薪',value: item.applicantSalaryYear},
                  {label: '身份证地址',value: item.applicantIdAddress},
                  {label: '收件地址',value: item.applicantAddress},
                  {label: '受保人',value: item.insurant},
                  {label: '受保人性别',value: item.insurantSex},
                  {label: '受保人关系',value: item.relation},
                  {label: '受保人国籍',value: item.insurantNatinoality},
                  {label: '受保人年龄',value: item.insurantAge},
                  {label: '受保人身份证号码',value: item.insurantId},
                  {label: '受保人港澳通行证号码',value: item.insurantPermit},
                  {label: '受保人护照号码',value: item.insurantPassport},
                  {label: '受保人公司名称',value: item.insurantCompany},
                  {label: '受保人公司地址',value: item.insurantCompanyAddress},
                  {label: '受保人职务',value: item.insurantJob},
                  {label: '受保人职位',value: item.insurantPosition},
                  {label: '受保人年薪',value: item.insurantSalaryYear},
                  {label: '受保人身份证地址',value: item.insurantIdAddress},
                  {label: '受保人收件地址',value: item.insurantAddress},
                  {label: '受保人是否吸烟',value: _true_false},
                  {label: '状态',value: item.status}
                ]
                item.orderDetailList = orderDetailList
                item.title = '保单号'
                item.value = item.orderId
                vue.$data.orderList.push(item)

                if(!vue.$data.orderList[0].id){
                  vue.$data.orderList.splice(0, 1)
                }
              }
              }
            }
          })

        }
      }
    }
  }
</script>

<style>
  *{font-size: 14px;}
  .insurance em{font-size: 12px !important;}
</style>
