module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.outputDir,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/resouce/': {
        target: 'http://192.168.7.234:9527',
        changeOrigin: true
      },
      '/zhjd/database/': {
        target: 'http://192.168.7.234:9527',
        changeOrigin: true
      },
      '/resouceManagement/': {
        target: 'http://192.168.7.234:9527',
        changeOrigin: true
      },
      '/jobJdbcDatasource': {
        target: 'http://192.168.7.234:9527',
        changeOrigin: true
      },
      '/fileCollect/': {
        target: 'http://192.168.7.234:9527',
        changeOrigin: true
      },
      '/detoxification-data/': {
        target: 'http://192.168.7.222:8085',
        changeOrigin: true
      },
      '/api/drc': {
        target: 'http://192.168.7.196:8087',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/table': { // 赵家兴
        target: 'http://192.168.7.196:8090',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/source': { // 赵家兴
        target: 'http://192.168.7.196:8090',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/monitor': { // 唐鑫
        target: 'http://192.168.7.196:8090',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/alter': { // 唐鑫
        target: 'http://192.168.7.196:8090',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/strategy': { // 赵家兴
        target: 'http://192.168.7.196:8090',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/api/': {
        target: 'http://192.168.7.181:8882',
        changeOrigin: true
      }

    }
  }
}
