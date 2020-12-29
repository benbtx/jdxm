import Vue from 'vue'

/** 权限指令**/
const has = Vue.directive('has', {
  bind: function (el, binding, vnode) {
    // 获取页面按钮权限
    let btnPermissionsArr = []
    if (binding.value) {
      // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
      btnPermissionsArr = Array.of(binding.value)
    } else {
      // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
      btnPermissionsArr = vnode.context.$route.meta.btnPermissions
    }
    if (!Vue.prototype.$_has(btnPermissionsArr)) {
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false
  // 获取用户按钮权限
  const btnPermissionsStr = sessionStorage.getItem('btnPermissions')
  if (btnPermissionsStr === undefined || btnPermissionsStr == null) {
    return false
  }
  if (value.indexOf(btnPermissionsStr) > -1) {
    isExist = true
  }
  return isExist
}
export { has }

// inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
// 如果bind获取不到el.parentNode
// 试试把 bind 改为 inserted
// const has = Vue.directive("has", {
//   inserted: function(el, binding) {
//       console.log(binding,"w")
//       // 获取按钮权限// 获取按钮权限
//       if (!Vue.prototype.$_has(binding.value)) {
//           el.parentNode.removeChild(el);
//       }
//   }
// });
// //// 权限检查方法（且把该方法添加到vue原型中）
// Vue.prototype.$_has = function(value) {
//   let isExit = false;
//   let buttonpermsStr = JSON.parse(sessionStorage.getItem("loginVal"));

//   if (buttonpermsStr === undefined || buttonpermsStr=== null) {
//       return false;
//   }
//   for (let i = 0; i < buttonpermsStr.length; i++) {
//       let buttonpermsStrId = buttonpermsStr[i]
// 　　　　　　if (buttonpermsStrId.code == value) {//要拿数据中不变的并且可以使用的字段进行判断，不可以使用id
//           isExit = true;
//           break;
//       }
//   }
//   return isExit;
// };
// export { has };
