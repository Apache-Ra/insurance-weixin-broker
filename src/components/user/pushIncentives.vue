<template>
  <div>
    <div v-for="item in list" class="mbay-ui-preview">
      <form-preview :header-label="item.name" :header-value="item.policyNumber" :body-items="item.dataList"></form-preview>
    </div>
  </div>
</template>

<script>
  import Page from '../kits/page.vue'
  import {FormPreview, cookie} from 'vux'

  export default {
    components: {
      Page,
      FormPreview
    },
    created () {
      let vue = this
      vue.updateTitle('推广奖励')
      vue.get({
        url: '/reward/findExtend',
        headers: {'token': cookie.get('token')},
        success:  function (data) {

          for(let i in data.order){

            let item = data.order[i]

            for(let y in item){
              let list_ = [{}]
              let itmes = item[y]
              list_.name = '订单号'
              list_.policyNumber = itmes.id

              let dataList = [
                {
                  label: '申请人',
                  value:  itmes.insurance_order.applicant
                },
                {
                  label: '手机号',
                  value:  itmes.user.mobile
                },
                {
                  label: '提交日期',
                  value:  itmes.createdAt
                },
                {
                  label: '产品名称',
                  value:  itmes.insurance_order.productName
                },
                {
                  label: '保费',
                  value:  itmes.insurance_order.dollar
                }
              ]

              list_.dataList = dataList

              vue.$data.list.push(list_)
            }


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
    methods: { }
  }
</script>
<style>
  .mbay-ui-preview em{font-size: 14px !important;}
</style>
