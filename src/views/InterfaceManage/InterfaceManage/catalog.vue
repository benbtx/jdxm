<template>
    <div class="main">
      <div class="title">数据目录</div>
      <div class="search">
        <el-input
        placeholder="请输入"
        suffix-icon="el-icon-search"
        v-model="input1">
      </el-input>
      </div>
      <div class="content">
        <el-tree
          ref="tree"
          :data="tree"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          @node-click="nodClick"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
</template>

<script>
import { queryInterface } from '@/projectModule/api/InterfaceManage/InterfaceCatalogManage.js'
export default {
  name: 'catalog',
  data () {
    const data = [
      {
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    return {
      data: JSON.parse(JSON.stringify(data)),
      input1: '',
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.queryInterface()
  },
  methods: {
    queryInterface () {
      this.loading = true
      this.tree = []
      queryInterface().then(data => {
        this.loading = false
        if (data.code === 0) {
          this.tree = data.data ? data.data : []
        }
      }).catch(() => {
        this.loading = false
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    renderContent (h, { node, data, store }) {
      return (
        <el-tooltip className="item" effect="light" placement="bottom">
          <div slot="content">
            <span style="display: inline-block;width:60px;text-align:right"> 描述：</span>
            {data.describe}
            <br/>
            <span style="display: inline-block;width:60px;text-align:right"> 过期时间：</span>
            {data.validPeriod}
          </div>
          <span><i class="el-icon-document iconColor" ></i>{data.name}</span>
        </el-tooltip>)
    },
    nodClick (data) {
      this.$emit('getDetail', data)
    }
  },
  watch: {
    input1 (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/projectModule/assets/css/basic-color.scss";
.main{
  height: 100%;
  box-sizing: border-box;
  border: solid 1px $color-border;
  width: 300px;
  .title{
    background-color: #F9F9FB;
    padding: 0 10px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    border-bottom: solid 1px $color-border;
  }
  .search{
    padding: 10px;
  }
  .content{
    height: calc(100% - 84px);
    overflow-y: auto;
    .active{
      background-color: $color-secondary;
    }
    .detail{
      padding: 10px;
      font-size: 14px;
      display: flex;
      cursor: pointer;
      &:hover{
        background-color: $color-secondary;
      }
      .name{
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        i{
          color: $color-primary;
        }
      }
      .tool{
        width: 20px;
        i{
          color: $color-primary;
          cursor: pointer;
        }
        i:nth-child(1){
          color: red;
        }
      }
    }
  }
  .add {
    line-height: 30px;
    border: 1px dashed gainsboro;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .iconColor{
    color: $color-primary;
    margin-right: 5px;
  }
</style>
