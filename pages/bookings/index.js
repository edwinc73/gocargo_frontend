// pages/bookings/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    renter: false
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }

  const page = this

  wx.request({
    url: 'https://gocargo-rails.osc-fr1.scalingo.io/api/v1/bookings',
    success(res){
      page.setData({
        booking_owner: res.data.booking_owner,
        booking_renter: res.data.booking_renter,
        bookings: res.data.booking_owner
      })
      console.log(page.data.bookings)
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
  }
})