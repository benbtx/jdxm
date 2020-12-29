<template>
  <div class="button-bar">
    <template v-for="(item, index) of buttons">
      <span
        style="margin-right: 10px"
        v-has="item.permission"
        v-if="item.render"
        :key="item.text + ''+index+primaryKey"
      >
        <expand-dom :data="item" :render="item.render"></expand-dom>
      </span>

      <el-button
        style="margin-left: 0px; margin-right: 10px"
        v-else
        :key="item.text + ''+index +primaryKey"
        :type="item.type || 'primary'"
        :plain="!!item.plain"
        :size="item.size || 'small'"
        :icon="item.icon"
        v-has="item.permission"
        @click="() => item.fn()"
      >
        {{ item | fixButtonText }}
      </el-button>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        data: Object,
        render: Function
      },
      render: (h, ctx) => {
        const params = {
          data: ctx.props.data
        }
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    primaryKey: {
      type: String,
      default: () => {
        return (Math.random() * 1000).toFixed(4)
      }
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {},
  filters: {
    fixButtonText (item) {
      return item.number ? `${item.text} (${item.number})` : item.text
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
// padding: 14px 0;
/deep/.iconfont {
  font-size: 12px;
}
.button-bar {
  padding: 14px;
}
</style>
