<template>
  <div>
    <div v-for="plan in planList">
      <form-preview :header-label="plan.title" :header-value="plan.value" :body-items="plan.planFindList" class="plan"></form-preview>
    </div>
  </div>
</template>

<script>
    import {FormPreview,  cookie} from 'vux'
    export default {
        components: {FormPreview},
        created () {
          let vue = this
          vue.updateTitle('方案详情')
          vue.get({
            url: '/programme/find',
            headers: {'token': cookie.get('token')},
            params: {
              orderId: vue.$route.query.orderId
            },
            success: function (data) {
              if(data.programme == null){
                  
              }else {
                vue.$data.planList = [{
                    title : '方案编号',
                    value : data.programme.orderId,
                    planFindList:[
                      {label: '受保人',value: data.programme.insurant},
                      {label: '性别',value: data.programme.product},
                      {label: '产品类别',value: data.programme.product},
                      {label: '预算范围',value: data.programme.budget},
                      {label: '提交时间',value: data.programme.createdAt}
                    ]
                }]

                if(!vue.$data.planList[0].value){
                  vue.$data.planList.splice(0, 1)
                }
              }
            }
          })
        },
        data () {
            return {
              planList:[{}]
            }
        },
        methods: {}
    }
</script>

<style>
*{font-size: 14px;}
.plan em{font-size:12px !important;}
</style>
