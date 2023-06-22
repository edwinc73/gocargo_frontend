// pages/bookings/new.js
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
    const app = getApp()
    app.globalData.dates = ["2023-06-22", "2023-06-22"] 
    // the above line is only for development purpose 
    const dates = app.globalData.dates
    const page = this
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let today = year + '-' + month + '-' + day;
    
    const days = (new Date(dates[1]) - new Date(dates[0])) / 86400000

    page.setData({
      id: this.options.id,
      today: today,
      startDate: dates[0],
      endDate: dates[1],
      days: Math.ceil(days)
    });
    
    wx.request({
      url: `https://gocargo-rails.osc-fr1.scalingo.io/api/v1/cars/${page.data.id}`,
      success(res){
        page.setData({
          car: res.data.car
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
  confirmBooking(){
    const booking = {
      start_date: startDate,
      return_date: endDates
      // total_price: 
    }
  },
  bindStartDateChange(e){
    const input = e.detail.value
    const days = (new Date(this.data.endDate) - new Date(this.data.startDate)) / 86400000
    console.log(days)
    this.setData({
      startDate: input,
      days: Math.ceil(days)
      // total_price
    })
    getApp().globalData.dates[0] = this.data.startDate
  },
  bindEndDateChange(e){
    const input = e.detail.value
    const days = (new Date(this.data.endDate) - new Date(this.data.startDate)) / 86400000
    this.setData({
      endDate: input,
      days: Math.ceil(days)
    })
    console.log(days)
    getApp().globalData.dates[1] = this.data.endDate
  }
})