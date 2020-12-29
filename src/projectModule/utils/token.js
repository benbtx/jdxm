export const getToken = () => {
  const token = localStorage.getItem('token') || 'YE7N2I@*zocDGzB!Beh%**oM0ulyf!eqJpArQoas'
  // 开发环境无法获取token，但是必须传入token，设置默认值
  return token
}
