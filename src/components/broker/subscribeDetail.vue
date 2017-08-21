<template>
  <div>
    <div v-for="subscribe in subscribeList">
      <form-preview :header-label="subscribe.title" :header-value="subscribe.value" :body-items="subscribe.subscribeFindList" class="plan"></form-preview>
    </div>
  </div>
</template>

<script>
  import {FormPreview,  cookie} from 'vux'
  export default {
    components: {FormPreview},
    created () {
      let vue = this
      vue.updateTitle('预约赴港')
      vue.get({
        url: '/appointment/find',
        headers: {'token': cookie.get('token')},
        params: {
          orderId: vue.$route.query.orderId
        },
        success: function (data) {
          if(data.appointment == null){

          }else{
          vue.$data.subscribeList = [{
            title : '预约单号',
            value : data.appointment.orderId,
            subscribeFindList:[
              {label: '航班号',value: data.appointment.flightNumber},
              {label: '航班日期',value: data.appointment.flightDate},
              {label: '随行人员数',value: data.appointment.peoples},
              {label: '是否需要香港开户',value: data.appointment.whetherOpenAccount},
              {label: '开户类别',value: data.appointment.openAccountType},
              {label: '开户银行',value: data.appointment.openAccountBank}
            ]
          }]
            }
//          if(!vue.$data.planList[0].value){
//            vue.$data.planList.splice(0, 1)
//          }
        }
      })
    },
    data () {
      return {
        subscribeList:[{}]
      }
    },
    methods: {}
  }
</script>

<style>
  *{font-size: 14px;}
  .plan em{font-size:12px !important;}
</style>
