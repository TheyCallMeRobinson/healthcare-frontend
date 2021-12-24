module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://servachok2021.ddns.net:8080',
                // target: 'http://localhost:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        compress: true,
        disableHostCheck: true
    }
}