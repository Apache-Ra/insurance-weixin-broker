<template>
  <div>
    <div v-for="order in orderList">
      <form-preview :header-label="order.title" :header-value="order.value" :body-items="order.orderFindList" class="plan"></form-preview>
    </div>
  </div>
</template>

<script>
  import {FormPreview,  cookie} from 'vux'
  export default {
    components: {FormPreview},
    created () {
      let vue = this
      vue.updateTitle('保单详情')
      vue.get({
        url: '/insuranceOrder/find',
        headers: {'token': cookie.get('token')},
        params: {
          orderId: vue.$route.query.orderId
        },
        success: function (data) {
           // console.log(data)
          vue.$data.orderList = [{
            title : '保单号',
            value : data.insuranceOrder.orderId,
            orderFindList:[
              {label: '保险公司',value: data.insuranceOrder.insuranceCompany},
              {label: '产品名称',value: data.insuranceOrder.productName},
              {label: '保费',value: data.insuranceOrder.dollar},
              {label: '付费年限',value: data.insuranceOrder.paidYears},
              {label: '是否吸烟',value: (data.insuranceOrder.applicantSmoke == true) ? '是' : '否'},
              {label: '投保人',value: data.insuranceOrder.applicant},
              {label: '投保人性别',value: data.insuranceOrder.applicantSex},
              {label: '投保人国籍',value: data.insuranceOrder.applicantNatinoality},
              {label: '投保人年龄',value: data.insuranceOrder.applicantAge},
              {label: '身份证号码',value: data.insuranceOrder.applicantId},
              {label: '港澳通行证号码',value: data.insuranceOrder.applicantPermit},
              {label: '护照号码',value: data.insuranceOrder.applicantPassport},
              {label: '公司名称',value: data.insuranceOrder.applicantCompany},
              {label: '公司地址',value: data.insuranceOrder.applicantCompanyAddress},
              {label: '职务',value: data.insuranceOrder.applicantJob},
              {label: '职位',value: data.insuranceOrder.applicantPosition},
              {label: '年薪',value: data.insuranceOrder.applicantSalaryYear},
              {label: '身份证地址',value: data.insuranceOrder.applicantIdAddress},
              {label: '收件地址',value: data.insuranceOrder.applicantAddress},
              {label: '受保人',value: data.insuranceOrder.insurant},
              {label: '受保人性别',value: data.insuranceOrder.insurantSex},
              {label: '受保人关系',value: data.insuranceOrder.relation},
              {label: '受保人国籍',value: data.insuranceOrder.insurantNatinoality},
              {label: '受保人年龄',value: data.insuranceOrder.insurantAge},
              {label: '受保人身份证号码',value: data.insuranceOrder.insurantId},
              {label: '受保人港澳通行证号码',value: data.insuranceOrder.insurantPermit},
              {label: '受保人护照号码',value: data.insuranceOrder.insurantPassport},
              {label: '受保人公司名称',value: data.insuranceOrder.insurantCompany},
              {label: '受保人公司地址',value: data.insuranceOrder.insurantCompanyAddress},
              {label: '受保人职务',value: data.insuranceOrder.insurantJob},
              {label: '受保人职位',value: data.insuranceOrder.insurantPosition},
              {label: '受保人年薪',value: data.insuranceOrder.insurantSalaryYear},
              {label: '受保人身份证地址',value: data.insuranceOrder.insurantIdAddress},
              {label: '受保人收件地址',value: data.insuranceOrder.insurantAddress},
              {label: '受保人是否吸烟',value: (data.insuranceOrder.insurantSmoke == true) ? '是' : '否'}
            ]
          }]
          //console.log(vue.$data.orderList)
//          if(!vue.$data.orderList[0].id){
//            vue.$data.orderList.splice(0, 1)
//          }
        }
      })
    },
    data () {
      return {
        orderList:[{}]
      }
    },
    methods: {}
  }
</script>

<style>
  *{font-size: 14px;}
  .plan em{font-size:12px !important;}
</style>
