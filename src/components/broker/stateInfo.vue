<template>
  <group>
    <timeline>
      <timeline-item v-for="(status, index) in statusInfo" :key="index" class="statusClass" :class="status.class">
        <p class="status_ status">{{status.status_}}  <x-button mini action-type="button" @click.native="examine(status.linkUrl)" v-if="status.examineBtn" class="examine">查看</x-button></p>
        <p class="_status status">{{status._status}}</p>
      </timeline-item>
    </timeline>
  </group>
</template>

<script>
  import {Group, Timeline, TimelineItem, XButton, cookie} from 'vux'
  export default {
    components: {
      Group,
      Timeline,
      TimelineItem,
      XButton
    },
    created () {
      let vue, parameter, constants, statusInfo
      vue = this
      vue.updateTitle('状态详情');
      parameter = vue.$route.query
      constants =JSON.parse( cookie.get('constants'))
      statusInfo = constants.orderStatusType



      console.log(statusInfo)
      console.log(parameter.state)
      /**
       *
      */


      /**
       * @parameter   地址栏取出的状态
       * @statusInfo  取出的常量信息
       */

      for(let i in statusInfo){
        let item = statusInfo[i]
        /**
         * @status_true 存放已经完成的步骤
         * @status_false存放尚未完成的步骤
         */
        if(item === parameter.state){
          let status_true = statusInfo.slice(0, parseInt(i)+1)
          let status_false = statusInfo.slice(parseInt(i)+1, 14)
          let examineBtn, linkUrl

          for(let j in status_true){
            if(status_true[j] === '获取方案'){
              vue.get({
                  url: '/programme/find',
                  headers: {'token': cookie.get('token')},
                  params: {orderId: vue.$route.query.orderid},
                  success: function (data) {
                    if(data.programme == null){
                      examineBtn = false
                    }else {
                      examineBtn = true
                      linkUrl = '/index/broker/programmeDetail'
                    }
                  }
                })

            }else if(status_true[j] === '保险下单'){
                examineBtn = true
                linkUrl = '/index/broker/insuranceOrderDetail'
              }else if(status_true[j] === '提交赴港预约单'){
                examineBtn = true
                linkUrl = '/index/broker/subscribeDetail'
              }else{
                examineBtn = false
              }

              let _obj = {
                status_:status_true[j],
                _status:'',
                class:'status_true',
                examineBtn:examineBtn,
                linkUrl:linkUrl
              }
              vue.$data.statusInfo.push(_obj)
              if(!vue.$data.statusInfo[0].status_){
                vue.$data.statusInfo.splice(0, 1)
              }
          }

          for(let k in status_false){
            let obj_ = {
              status_:'',
              _status:status_false[k],
              class:'status_false'
            }
            vue.$data.statusInfo.push(obj_)
          }
        }
      }

    },
    data () {
      return {
        status_status:'',
        statusInfo: [{}]
      }
    },
    methods: {

      examine (val) {
        let vue = this
        vue.$router.push(val+'?orderId='+vue.$route.query.orderid)
      }
    }
  }
</script>

<style>
  *{font-size: 13px}
  .status{margin-left: 10px}
  .status_{font-weight: bold}
  ._status{font-weight: bold;color:#CCC}
  .status_true .vux-timeline-item-color{
    width: 20px;
    height: 20px;
    left: -4px;
    top: 0;}

  .status_true .vux-timeline-item-color .vux-timeline-item-checked{display: block !important;}
  .statusClass .vux-timeline-item-content{padding: 3px 0 2rem 1.2rem;}
  .status_false{}
  .examine{float: right}
</style>
