# 实现功能
一个前端导出excel组件。
# Attribute
|  参数   | 说明  | 类型|可选值 |默认值|
|  :-----  | :-----  |  :-----  | :-----  |:-----  | 
|  disabled   | 导出按钮的禁用状态。  |Boolean| - |false|
|  buttonType   | 导出按钮类型。 | String |primary / success / warning / danger / info / text|-|
|  buttonSize   | 按钮大小。  | String|medium / small / mini |-|
|  fileName   | 导出文件名。  | String |-|全部列表.xlsx|
|  sheetName   | 表的sheet名称。  | String |-|-|
|  fnGetData   | 获取数据的方法，可以是同步或异步方法，但必须return出数组供组件使用。  | Function |-|-|
|  config   | 导出配置，具体参看“config”章节。  | Object |-|-|
|  exportConfig   | 推荐用这种方式传配置，多sheet导出配置,具体参看“exportConfig”章节。  | Array, Object, Function |Null||
|  title   | 导出按钮显示的文字。  | String |-|导出|

## config
```javascript
export const exportConfig = {
    // 数据导出配置
    includes: ["yourKey"],
    formatters: {
        yourKey: {
            title: "数据1"
            // formatter: val => val || "-"
            // 不设置formatter 则按数据中对应的键进行导出
          }
    }
```
## exportConfig
允许传三种类型的值来使用本组件，下面分情况演示。
```javascript
exportConfig: {
    type: [Array, Object, Function],
    default: null
    // () => {
    //     return {
    //         sheetName: "sheet", // sheet名称
    //         config: {},
    //         fnGetData: () => []
    //     };
    // }
}
```
### Object
```javascript
exportConfig: {
  sheetName: "sheet", // sheet名称
  config: {}, // 可参考上问提到的config
  fnGetData: () => [] // 获取数据的方法
};
```
### Array
Object的集合，sheetName不能重复，导出多sheet。
```javascript
exportConfig: [
  {
  sheetName: "sheet1",
  config: {},
  fnGetData: () => []
  },
  {
    sheetName: "sheet2",
    config: {},
    fnGetData: () => []
  }
]
```
### Function
项目中可能需要动态的去生成导出所需的配置，因此也提供传Function的方式来传入导出配置。
```javascript
exportMulConfig() {
    let fnGetData = function(){
      //yourFun
    };
    let config={...yourconfig} ;
    return [{ config, fnGetData }];
}
```
> 为null时则使用config和fnGetData的配置来导出数据。