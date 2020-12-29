<template>
    <div class="pages" v-show="total">
        <div class="total">
            共 {{ total }} 条记录 第 {{ current }} / {{ totalPage }} 页
        </div>
        <el-pagination
            background
            :layout="layout"
            :total="total"
            :current-page="current"
            :page-size="size"
            :page-sizes="pageSizes ? pageSizes : sizes"
            @size-change="changeSize"
            @current-change="changePage"
        />
    </div>
</template>

<script>
export default {
  name: 'kr-pagination',

  props: {
    total: {
      type: Number
    },
    defaultCurrent: {
      type: Number
    },
    pageSizes: {
      type: Array
    }
  },

  data () {
    return {
      current: 1,
      size: 10
    }
  },

  created () {
    this.size = this.pageSizes ? this.pageSizes[0] : this.sizes[0]
  },

  computed: {
    layout () {
      const layout = ['prev', 'pager', 'next', 'sizes', 'jumper']
      return layout.join(',')
    },

    sizes () {
      return [10, 20, 50, 100, 200]
    },

    totalPage () {
      const { total, size } = this
      return Math.ceil(total / size)
    }
  },

  methods: {
    changePage (page) {
      this.$emit('on-page-change', page, this.size)
      this.current = page
    },

    changeSize (size) {
      this.current = 1
      this.$emit('on-page-change', this.current, size)
      this.size = size
    }
  },
  watch: {
    defaultCurrent (newVal) {
      this.current = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    line-height: 34px;
    text-align: right;

    .total {
        font-size: 14px;
    }
}
</style>
