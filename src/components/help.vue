<template>
  <div>
    <group v-for="(answer, key) in answerList" :key="key" class="problem">
      <cell :title="answer.problem" is-link :border-intent="false" :arrow-direction="answer.alias ? 'up' : 'down'" @click.native="answer.alias = !answer.alias"></cell>
      <template v-if="answer.alias">
          <cell :title="answer.answer" class="answer"></cell>
      </template>
    </group>
  </div>
</template>

<script>
  import {Qrcode, XTable, Group, Cell, CellBox, CellFormPreview} from 'vux'
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
      //vue.updateTitle('帮助');
      let data = require('../assets/data/help.json')
      for(let i in data.data){
        let item = data.data[i]

        let obj = {
          problem:item.problem,
          answer:item.answer,
          alias:item.alias
        }
        vue.$data.answerList.push(obj)
      }

    },
    data () {
      return {
        answerList:[]
      }
    },
    methods: {}
  }
</script>

<style>
  *{font-size: 14px}
  .groupBefore{position: relative;text-align:center;padding-top:25px}
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

  .answer .vux-label{line-height: 25px !important;}
</style>
