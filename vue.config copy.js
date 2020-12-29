module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.outputDir,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/': {
        ws: false,
        // target: "http://192.168.7.125:8081", // 黄发祥
        // target: "http://192.168.7.222:8082", // 李鸿宇
        // target: "http://192.168.7.132:8081", // 赵家兴
        target: 'http://192.168.7.181:8081', // 刘洪超
        // target: 'http://192.168.7.222', // 服务器
        // target: 'http://192.168.7.241:9527', // 白洪斌
        changeOrigin: false
      }
    }
  }
}
