
<template>
  <group>
    <cell title="客服热线" :value="telNumber" @click.native="onClick" is-link> </cell>
  </group>
</template>

<script>
    import {Group, Cell } from 'vux'
    export default {
        components: {
          Group,
          Cell
        },
        created () {
          this.updateTitle('联系客服')
        },
        data () {
            return {
              telNumber:18802715819
            }
        },
        methods: {
          onClick (){
            window.location.href = 'tel://'+this.$data.telNumber
          }
        }
    }
</script>

<style>
*{font-size: 14px;}
</style>
