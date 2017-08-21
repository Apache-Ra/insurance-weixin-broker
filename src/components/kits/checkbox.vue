<template>
  <vue-checkBox @checkBox="checkBox">
    <label for="checkbox" class="checkLabel">
      <div class="checkBoxCheck">
        <input type="checkbox" id="checkbox" class="regular-checkbox" v-model="checked"/><i class="check"></i> <span class="checkTitle" @click="checkBtn">同意并阅读条款 <a>《服务条款》</a></span>
      </div>
    </label>
  </vue-checkBox>
</template>

<script>
    //import **/{**, **} from **
    export default {
        components: {},
        created () {
          let vue = this

        },
        data () {
            return {
              check:true
            }
        },
        methods: {
          checkBtn:function () {

          }
        }
    }
</script>

<style type="text/css">
  .checkLabel{display:block;}
  .checkBoxCheck{}
  .checkTitle{}
  .check{top: 4px}
  i[class='check'] {display: inline;}

  .regular-checkbox {display: none;}

  .regular-checkbox + i[class='check'] {
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05),
    inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 9px;
    border-radius: 3px;
    display: inline-block;
    position: relative;}

  .regular-checkbox + i[class='check']:active, .regular-checkbox:checked + i:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05),
    inset 0px 1px 3px rgba(0,0,0,0.1);}

  .regular-checkbox:checked + i[class='check'] {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #99a1a7;}

  .regular-checkbox:checked + i[class='check']:after {
    content: '\2714';
    font-size: 14px;
    position: absolute;
    top: -1px;
    left: 2px;
    color: #99a1a7;
  }
</style>

