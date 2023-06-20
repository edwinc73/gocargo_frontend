// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.loadFontFace({
      family: 'poppins',
      source: 'url("https://github.com/itfoundry/Poppins/tree/master/products/Poppins-4.003-GoogleFonts-TTF")'
    })
  },
  globalData: {
    userInfo: null
  }
})
