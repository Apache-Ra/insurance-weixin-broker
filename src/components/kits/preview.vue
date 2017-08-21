<template>
  <group v-bind:title="title">
    <grid :rows="2">
      <grid-item v-for="(item, index) in previewList" :key="index">
        <div class="previewImg" >
          <img class="previewer-demo-img" :src="item.src" @click="show(index)">
        </div>
      </grid-item>
      <div  v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options"></previewer>
      </div>

    </grid>
  </group>
</template>

<script>
  import {Group, Grid, GridItem, Previewer, TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Grid,
      GridItem,
      Previewer
    },
    props: {
      previewList: Array,
      previewTitle: {
        type: String,
        default () {
          return '示例'
        }
      }
    },
    created () {
      this.$props.previewList.forEach((preview) => {
        if (!preview.w) {
          preview.w = 1200
        }

        if (!preview.h) {
          preview.h = 900
        }
      })
    },
    data () {
      return {
        list: this.$props.previewList,
        title: this.$props.previewTitle,
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    }
  }
</script>

<style>
  .previewImg{border:1px solid #D9D9D9;
    height:100px;text-align: center;margin: 0 10px}
  .previewer-demo-img {
    max-height: 100%;
    max-width: 100%;
    height:100%;
  }
</style>
