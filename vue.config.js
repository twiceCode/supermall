module.exports = {
    configureWebpack: {
        resolve: {
            // extensions 对文件后缀加以优化
            alias: {
                'assets': '@/assets',
                'network': '@/network',
                'views': '@/views',
                'utils': '@/utils',
                'components': '@/components'
            }
        }
    }
}