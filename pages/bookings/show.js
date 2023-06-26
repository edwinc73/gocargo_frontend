// pages/bookings/show.js
Page({
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this

    wx.request({
      url: `http://127.0.0.1:3000/api/v1/bookings/10`,
      success(res){
        page.setData({
          car: res.data.car,
          image: res.data.car.car_image,
          booking: res.data.booking,
          renter: res.data.renter,
          owner: res.data.owner
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