# 说明
本组件是由原生table写的信息展示组件，自适应容器宽度。
# Props
|  参数   | 说明  | 类型 |默认值|
|  :-----  | :-----  |  :-----  | :-----  |
|  cellsPerLine   | 每行渲染的格子数，可以理解成栅栏布局的格子。  | Number |4|
|  datasPerline(无实际用途，已废弃)   | 每行展示多少个数据，比如：颜色：蓝色 尺寸：大  | Number |2|
|  data   | 展示的数据对象，键名与cells数组子对象的key值相同  | Object |{}|
|  cells   | 参见 “cells 解释”  | Array |[]|
|  inOneCell   | 每个数据对象占1格还是2格。  | Boolean |true|
|  labelCellStyle   | 数据label列的样式（仅在inOneCell为false时生效）  | Object或String |{}|
|  textCellStyle   | 数据text列的样式（仅在inOneCell为false时生效）  | Object或String |{}|
## 数组子对象示例

```javascript
{ 
    label: String, // 数据名称
    key: String, // 数据键名
    colspan: Number, // colspan合并多少列
    render(h, params) {
        return (
            <el-button
                // {data,cell} = params
                // onClick={() => _this.someFunc(data)}
                type="text"
            >
                {params.cell.somekey}其他文档
            </el-button>
        );
    },
}
```
> # colspan 说明
> label的colspan默认且为1，设置colspan设置的是text的 colspan默认为1，可手动设置其他整数。
》注意：各label*1+各text的colspan相加应小等于cellsPerline.
## inOneCell 解释
说明：每个数据项放进一个（<td>{{label}}{{data[key]}}</td>）还是两个（<td>{{label}}</td><td>{{value}}</td>）
类型：Boolean
默认：true
# 优化项及使用建议
统一使用下列方式使用组件可将所有模块里的引用指向打包后“info-table-info.js”，减小打包体积的同时做到按需加载。
```javascript
const krTableInfo = () =>
    import(
        /* webpackChunkName: "info-table-info" */ "@/components/kr-table-info/index.vue"
    );
export default {
    components: {krTableInfo},
    /* your code here */
}
```
# 注意
由于北斗要求将页面打包成组件的的形式来调用，因此所有页面会在打包时异步调用单页面内使用“优化建议”里的方式可能出现预料之外的错，因此建议直接import XXX from "xx/xx/xx"