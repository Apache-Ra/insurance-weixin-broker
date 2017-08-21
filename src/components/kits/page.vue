<template>
  <scroller lock-x scrollbar-y use-pullup use-pulldown
            :height="height2" v-model="status" ref="scroller"
            @on-pullup-loading="loadMore" @on-pulldown-loading="refresh"
            :pulldown-config="pulldownConfig">
    <slot></slot>
    <div slot="pullup" class="pullup">
      <span v-show="status.pullupStatus === 'default'">上拉加载更多</span>
      <span v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'">松开加载更多</span>
      <span v-show="status.pullupStatus === 'loading'">加载中...</span>
    </div>
  </scroller>
</template>

<script>
  import {Scroller} from 'vux'

  export default {
    components: {
      Scroller,
    },
    props:{
      height:{
        type: String,
        default () {
          return '-99'
        }
      }
    },
    methods: {
      loadMore () {
        this.$emit('loadMore')
        this.$refs.scroller.donePullup()
        this.$nextTick(() => {
          this.$refs.scroller.reset()
        })
      },
      refresh () {
        setTimeout(() => {
          this.$emit('refresh')
          this.$refs.scroller.donePulldown()
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        }, 2000)
      }
    },
    data () {
      return {
        height2: this.$props.height,
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        pulldownConfig: {
          content: '下拉刷新',
          downContent: '下拉刷新',
          upContent: '释放刷新',
          loadingContent: '加载中...'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pullup {
    position: absolute;
    width: 100%;
    text-align: center;
  }
</style>
