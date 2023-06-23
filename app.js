// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const app = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url:  `${app.globalData.baseUrl}/login`,
          method: 'post',
          data: { code: res.code }, 
          success(loginRes) {
            app.globalData.user = loginRes.data.user 
            app.globalData.header = loginRes.data.headers
            console.log(loginRes)
          }
        })
      }
    })
    wx.loadFontFace({
      family: 'poppins',
      source: 'url("https://github.com/itfoundry/Poppins/tree/master/products/Poppins-4.003-GoogleFonts-TTF")'
    })
  },
  globalData: {
    header: null,
    user: null,
    userInfo: null,
    baseUrl: `http://127.0.0.1:3000/api/v1`
    // https://gocargo-rails.osc-fr1.scalingo.io
  }
})
