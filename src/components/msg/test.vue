<template>
<div>
  <group>
    <x-input title="身份证号码" :is-type="cardId" v-model="card" ref="card" required  @on-change="change(card)"></x-input>
    <x-input title="护照号码" :is-type="cardsID" v-model="cards" ref="cards" required @on-change="change(card)"></x-input>
  </group>

  <group style="padding: 20px">
    <XButton type="warn" :disabled="from_valid" action-type="button" @click.native="submit">提交</XButton >
  </group>


</div>
</template>
<script>
  import {Group, XInput, Cell, XButton} from 'vux'

  export default{
    components: {
      Group,
      XInput,
      Cell,
      XButton
    },
    created () {
      this.updateTitle("测试组件")
    },
    data(){
      return{
        value:"",
        value2:"",
        card:"",
        cards:"",
        valid1: false,
        from_valid:false,
        cardId:function (value) {
            return{
              valid:value === "123",
              msg:"输入cardID错误"
            }

        },
        cardsID:function (value) {
          return{
            valid:value === "456",
            msg:"cardsID"
          }

        }
      }
    },
    methods:{
      change (val) {
       console.log(val)
      },
      submit () {
        console.log(0)
        let vue = this

        let input_01 = vue.$refs.card.valid
        let input_02 = vue.$refs.cards.valid

        console.log(input_01,input_02)
      }
    }
  }
</script>
<style>
  .register-box{
    padding: 10px;
  }
  .pd05{
    margin-top: 5px;
  }
  .greenBtn{
    width: 173px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: red;
    color: #fff;
    margin-top: 5px;
  }
</style>
