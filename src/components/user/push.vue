<template>
  <div style="border-top:1px solid #FFF">
    <group>
      <cell :title="('我的推广码')" :value="invitation"></cell>
    </group>

    <group>
      <div style="padding:15px;">
        <x-table full-bordered style="background-color:#fff;">
          <thead>
          <tr>
            <th>用户名</th>
            <th>手机号</th>
            <th>订单状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="push in pushList">
            <td>{{push.userName}}</td>
            <td>{{push.userTel}}</td>
            <td>{{push.orderStatus}}</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </group>


  </div>
</template>

<script>
    import {Qrcode, XTable, Group, Cell, CellBox, CellFormPreview, cookie} from 'vux'
    export default {
        components: {
          Qrcode,
          XTable,
          Group,
          Cell,
          CellBox,
          CellFormPreview
        },
        mounted () {

        },
        created () {
          let vue = this
          vue.updateTitle('推广信息')
          vue.get({
            url: '/broker/find',
            headers: {'token': cookie.get('token')},
            success:function (data) {
              vue.$data.invitation = data.broker.invitation.substring(28)
              console.log(data)
            }
          })
          vue.get({
            url: '/order/extend',
            headers: {'token': cookie.get('token')},
            success:function (data) {
              let reg = /^(\d{3})\d{4}(\d{4})$/;

              for(let i in data.extendList){
                let item = data.extendList[i]
                  let pushListS = {
                    userName:item.name,
                    userTel:item.mobile.replace(reg, "$1****$2"),
                    orderStatus: (item.order === null) ? '否': '是'
                  }
                vue.$data.pushList.push(pushListS)
              }
              if(!vue.$data.pushList[0].id){
                vue.$data.pushList.splice(0, 1)
              }
              console.log(vue.$data.pushList)
            }
          })
        },
        data () {
            return {
              QrCode: true,
              pushList:[{}],
              invitation:''
            }
        },
        methods: {}
    }
</script>

<style>
  *{font-size: 14px}
  .groupBefore{position: relative;text-align:center;padding-top:5px}
  .groupBefore:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>
