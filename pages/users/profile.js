// pages/users/profile.js

Page({
  data: {

  },

  onChooseAvatar(e) {
    wx.getUserInfo({
      success: (res) => {
        const { userInfo } = res
        const { nickName, avatarUrl } = userInfo
        console.log('User\'s WeChat nickname:', nickName)
        console.log('User\'s WeChat avatar URL:', avatarUrl)

        this.setData({
          avatarUrl,
          nickname: nickName
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const app = getApp()
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/users/profile`,
      method: "GET",
      header: app.globalData.header,
      success: (res) => {
        console.log(res.data)
        page.setData({
          user: res.data,
          cars: res.data.cars,
          favourite_cars: res.data.favourite_cars
        })
      }
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})
