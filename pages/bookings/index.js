// pages/bookings/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    renter: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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
    const page = this
    const app = getApp()
    
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }

  wx.request({
    url: `${app.globalData.baseUrl}/api/v1/bookings`,
    header: app.globalData.header,
    success(res){
      page.setData({
        booking_owner: res.data.booking_owner,
        booking_renter: res.data.booking_renter,
        bookings: res.data.booking_renter
      })
    }
  })
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
  toggleRenter(){
    if(this.data.renter){
      this.setData({
        renter: false,
        bookings : this.data.booking_owner
      })
    } else {
      this.setData({
        renter: true,
        bookings : this.data.booking_renter
      })
    }
  },
  goToBooking(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/bookings/show?id=${id}`,
    })
  }
})