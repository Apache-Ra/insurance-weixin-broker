<template>

    <div>
      <div v-for="item in list">
        <form-preview :header-label="item.name" :header-value="item.policyNumber" :body-items="item.dataList"></form-preview>
      </div>
    </div>
</template>

<script>
  import {FormPreview, cookie} from 'vux'

  export default {
    components: {
      FormPreview
    },
    created () {
      let vue = this
      vue.updateTitle('保单奖励')
      vue.get({
        url: '/reward/findPolicy',
        headers: {'token': cookie.get('token')},
        success:  function (data) {

          for(let i in data.order){

            let list_ = [{}]
            let item = data.order[i]
            console.log(item.createdAt)

            list_.name = '订单号'
            list_.policyNumber = item.id

            let dataList = [
              {
                label: '申请人',
                value:  item.insurance_order.applicant
              },
              {
                label: '手机号',
                value:  data.user.mobile
              },
              {
                label: '提交日期',
                value:  item.createdAt
              },
              {
                label: '产品名称',
                value:  item.insurance_order.productName
              },
              {
                label: '保费',
                value:  item.insurance_order.dollar
              }
            ]

            list_.dataList = dataList

            vue.$data.list.push(list_)
            console.log(vue.$data.list)

          }

        }
      })

    },
    data () {
      return {
        list: [{}],
        pageNumber: 1,
        pageSize: 2,
        dataList:[{}],
        name: '',
        policyNumber: ''
      }
    },
    methods: {}
  }
</script>
<style>
  *{font-size: 14px;}
  .insurance em{font-size: 12px !important;}
</style>
