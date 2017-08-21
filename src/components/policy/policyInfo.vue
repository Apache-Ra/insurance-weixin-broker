<template>
  <div>
    <group>
      <cell :title="cellTitle" :value="cellValue" link="/index/policy/reservation"></cell>
    </group>
    <group title="预约服务列表" v-if="policyData">
      <div v-for="list in policyAllList">
        <form-preview :header-label="list.title" :body-items="list.policyFindList" class="bespoke"></form-preview>
      </div>
    </group>
    <load-more :show-loading="false" v-if="policyDatas" :tip="('暂无数据')" background-color="#fbf9fe"></load-more>

  </div>
</template>

<script>
    import {Group, FormPreview , Cell, LoadMore, XDialog, cookie} from 'vux'
    export default {
        components: {Group, FormPreview, Cell, LoadMore, XDialog},
        created () {
          let vue = this
          vue.updateTitle('预约信息');
          vue.get({
            url: '/bespoke/findAll',
            headers: {
              'token': cookie.get('token')
            },
            success: function (data) {
              if(data.bespokeList.length == 0){
                vue.$data.bespokeList = ""
              }else {
                if(data.bespokeList.length == 0){
                  vue.$data.policyDatas = false
                  vue.$data.show_loading = false
                  vue.$data.policyData = false

                }else{
                  vue.$data.policyDatas = false
                  vue.$data.show_loading = true
                  for(let i in data.bespokeList){
                    let item = data.bespokeList[i]
                    let policyFindList = [
                      {label: '预约内容',value: item.content},
                      {label: '创建时间',value: item.createdAt}
                    ]

                    item.policyFindList = policyFindList
                    vue.$data.policyAllList.push(item)
                    if(!vue.$data.policyAllList[0].id){
                      vue.$data.policyAllList.splice(0, 1)
                    }
                  }
                }
              }
            }
          })
        },
        data () {
            return {
              cellTitle:'新增预约服务',
              warmPrompt:"",
              cellValue:'',
              policyDatas:false,
              show_loading:false,
              policyData:true,
              policyAllList:[],
              warm_prompt:false
            }
        },
        methods: {}
    }
</script>

<style>
*{font-size: 14px;}
  .bespoke .weui-form-preview__value{font-size: 12px !important;}
  .mbay-dialogs .weui-dialog {background: none;color: #FFF;text-align: center;font-size: 14px;
  }
.bespoke .weui-form-preview__item{position: relative}
.bespoke .weui-form-preview__item:nth-of-type(2):before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

</style>
