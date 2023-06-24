// pages/cars/show.js
Page({

  /**
   * Page initial data
   */
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    page.setData({
      id: options.id
    })

    wx.request({
      url: `https://gocargo-rails.osc-fr1.scalingo.io/api/v1/cars/${this.data.id}`,
      success(res){
        page.setData({
          car: res.data.car,
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

  },
  addBooking(e){
    const id = this.data.id
    wx.navigateTo({
      url: `/pages/bookings/new?id=${id}`
    })
  },


})