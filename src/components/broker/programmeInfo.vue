<template>
  <div>
    <group>
      <cell :title="cellTitle" :value="cellValue" link="/index/broker/accessPlan"></cell>
    </group>
    <group title="方案列表" v-if="programmeData">
      <div v-for="list in programmeAllList">
        <form-preview :header-label="list.title" :header-value="list.orderId" :body-items="list.programmeFindList" class="programme" :footer-buttons="list.buttonList"></form-preview>
      </div>
    </group>
    <load-more :show-loading="false" v-if="programmeDatas" :tip="('暂无数据')" background-color="#fbf9fe"></load-more>

    <x-dialog v-model="warm_prompt" class="mbay-dialogs" hide-on-blur>
      <div style="font-size: 15px;">{{warmPrompt}}</div>
    </x-dialog>

  </div>
</template>

<script>
    import {Group, FormPreview , Cell, LoadMore, XDialog, cookie} from 'vux'
    export default {
        components: {Group, FormPreview, Cell, LoadMore, XDialog},
        created () {
          let vue = this
          vue.updateTitle('方案信息');
          vue.get({
            url: '/programme/findAll',
            headers: {
              'token': cookie.get('token')
            },
            success: function (data) {

              if(data.programmeList.length == 0){
                vue.$data.programmeAllList = ""
              }else {
                if(data.programmeList.length == 0){
                  vue.$data.programmeDatas = false
                  vue.$data.show_loading = false
                  vue.$data.programmeData = false
                }else{
                  vue.$data.programmeDatas = false
                  vue.$data.show_loading = true
                  for(let i in data.programmeList){
                    let item = data.programmeList[i]
                    let programmeFindList = [
                      {label: '受保人',value: item.insurant},
                      {label: '性别',value: item.sex},
                      {label: '产品类别',value: item.product},
                      {label: '预算范围',value: item.budget},
                      //{label:'审核状态', value:item.status},
                      {label: '提交时间',value: item.createdAt}
                    ]

                    let buttonList = [
                      { style: 'warn',text: '温馨提示',onButtonClick: (name) => {


                        vue.get({
                          url: '/broker',
                          headers:{'token':cookie.get('token')},
                          success:function (data) {
                            let statusData = require('../../assets/data/messge.json')
                            if(data.isBroker === '审核通过'){
                              vue.$data.warmPrompt = statusData.warmPrompt[3].content
                            } else {
                              if(item.status == '审核中' && item.order.status == "待确认"){
                                vue.$data.warmPrompt = statusData.warmPrompt[0].content
                              } else if(item.status == '审核通过' && (item.order.status == '获取方案' || item.order.status == "客服沟通")){
                                vue.$data.warmPrompt = statusData.warmPrompt[1].content
                              } else if(item.status == '审核通过' && item.order.status == "产品建议书确认"){
                                vue.$data.warmPrompt = statusData.warmPrompt[2].content
                              } else {
                                vue.$data.warmPrompt = "."
                              }
                            }
                          }
                        })


                          //取出JSON数据warn
                          vue.$data.warm_prompt = true
                      }},{ style: 'warn',text: '保险下单',onButtonClick: (name) => {

                        let statusBefore = ['待确认', '获取方案', '客服沟通']
                        let statusAfter = ['保险下单', '提交赴港预约单', '香港接待确认', '完成赴港签约', '保险公司审核通过','保单寄出', '保单拍照上传', '客服确认', '犹豫期完成', '获得全民经纪奖金']

                        let status_ = vue.contains(statusBefore,item.order.status)
                        if(status_){
                          vue.$data.warmPrompt = '请联系客服确认【产品建议书】'
                          vue.$data.warm_prompt = true
                        }
                        let _status = vue.contains(statusAfter,item.order.status)
                        if(_status){
                          vue.$data.warmPrompt = '该方案已下单'
                          vue.$data.warm_prompt = true
                        }


                        if(item.order.status == "产品建议书确认"){
                          vue.get({
                            url: '/broker',
                            headers:{'token':cookie.get('token')},
                            success:function (data) {
                              if(data.isBroker === '审核通过'){
                                if(item.order.insurance_order){
                                  vue.$vux.toast.show({
                                    isShowMask:true,
                                    type:'cancel',
                                    text: '此方案已下单',
                                    width:'12em',
                                    position:'default',
                                    onHide () {}
                                  })
                                }else{
                                  vue.$router.push('/index/broker/order?orderId=' + item.order.id)
                                }
                              }else if(data.isBroker === '审核中'){
                                vue.$vux.toast.show({
                                  isShowMask:true,
                                  type:'cancel',
                                  text: '全民经纪审核中',
                                  width:'12em',
                                  position:'default',
                                  onHide () {}
                                })
                              } else {
                                vue.$vux.toast.show({
                                  isShowMask:true,
                                  type:'cancel',
                                  text: '请先注册全民经纪',
                                  width:'12em',
                                  position:'default',
                                  onHide () {
                                    vue.$router.push('/index/broker/register')
                                  }
                                })
                              }
                            }
                          })
                        }

                      }}
                    ]

                    item.programmeFindList = programmeFindList
                    item.buttonList = buttonList
                    item.title = '订单号'
                    vue.$data.programmeAllList.push(item)
                    if(!vue.$data.programmeAllList[0].id){
                      vue.$data.programmeAllList.splice(0, 1)
                    }
                  }
                }
              }
            }
          })
        },
        data () {
            return {
              cellTitle:'新增方案',
              warmPrompt:"",
              cellValue:'',
              programmeDatas:false,
              show_loading:false,
              programmeData:true,
              programmeAllList:[{}],
              warm_prompt:false
            }
        },
        methods: {
          contains: function (arr, obj) {
            var i = arr.length;
            while (i--) {
              if (arr[i] === obj) {
                return true;
              }
            }
            return false;
          }
    }
    }
</script>

<style>
*{font-size: 14px;}
  .programme .weui-form-preview__value{font-size: 12px !important;}
  .mbay-dialogs .weui-dialog {background: none;color: #FFF;text-align: center;font-size: 14px;
  }
</style>
