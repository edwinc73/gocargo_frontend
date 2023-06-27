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
    const page = this
    // app.globalData.dates = ["2023-06-24", "2023-06-24"] 
    // the above line is only for development purpose 
    const dates = app.globalData.dates
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
    
    const days = Math.ceil((new Date(dates[1]) - new Date(dates[0])) / 86400000)
    
    page.setData({
      id: this.options.id,
      today: today,
      startDate: dates[0],
      endDate: dates[1],
      days: days
    });
    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/cars/${page.data.id}`,
      header: app.globalData.header,
      success(res){
        page.setData({
          car: res.data.car,
          total_price:  days * res.data.car.price_per_day
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
    const app = getApp()
    const page = this
    wx.showModal({
      title: 'Confirm booking',
      content: 'Are you sure?',
      success (res) {
        if (res.confirm) {
          // const booking = {
          //   booking: {
          //     start_date: page.data.startDate,
          //     return_date: page.data.endDate,
          //     total_price:  page.data.total_price
          //   }
          // }
          const booking = {
            start_date: page.data.startDate,
            return_date: page.data.endDate,
            total_price:  page.data.total_price
          }
          console.log(booking)
          console.log(page.data.car.id)
          wx.request({
            url: `${app.globalData.baseUrl}/api/v1/cars/${page.data.car.id}/bookings`,
            header: app.globalData.header,
            method: "POST",
            data: {booking},
            success(res){
              console.log({ res })
              wx.switchTab({
                url: "/pages/bookings/index"
              })
            }
          })
        }
      }
    })
  },
  bindStartDateChange(e){
    const input = e.detail.value
    const days = (new Date(this.data.endDate) - new Date(input)) / 86400000
    console.log(days)
    this.setData({
      startDate: input,
      days: Math.ceil(days),
      total_price:  days * this.data.car.price_per_day
    })
    getApp().globalData.dates[0] = this.data.startDate
  },
  bindEndDateChange(e){
    const input = e.detail.value
    const days = (new Date(input) - new Date(this.data.startDate)) / 86400000
    this.setData({
      endDate: input,
      days: Math.ceil(days),
      total_price:  days * this.data.car.price_per_day
    })
    getApp().globalData.dates[1] = this.data.endDate
  }
})