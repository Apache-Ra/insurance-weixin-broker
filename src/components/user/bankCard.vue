<template>
  <div>
    <group>
    <div style="margin: 10px;overflow: hidden;" v-for="item in list">
      <masker style="border-radius: 2px;">
        <div class="m-img"></div>
        <div slot="content" class="m-title">
          {{item.backCardName}}
          <br/>
          <span class="m-time">{{item.backCardNumber}}</span>
        </div>
      </masker>
    </div>
    </group>
    <group>
      <cell :title="('添加银行卡')" link="/index/user/addBankCard" is-link>
      </cell>
    </group>
  </div>
</template>

<script>
  import {Group, Masker, Cell} from 'vux'
  export default {
    components: {
      Group,
      Masker,
      Cell
    },
    created () {
        this.updateTitle("银行卡管理")
    },
    data () {
      return {
        list: [{
          backCardName: '中国招商银行',
          backCardNumber:'622848 ********* 6278'
        }]
      }
    },
    methods: {}
  }
</script>

<style>
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
