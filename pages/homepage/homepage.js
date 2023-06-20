// pages/homepage/homepage.js
Page({

  /**
   * Page initial data
   */
  data: {
    city: '',
    brand: '',
    date: '',
    today: '',
    startDate:"Start Date",
    endDate:"End Date"
  },

  onSearch: function() {
    // Handle the search logic here
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
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
    this.setData({
      date: today,
      today: today
    });
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
      selected: 0
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

  },
  formSubmit(e){
    const inputs = e.detail.value
    const {city, brand, startDate, endDate} = inputs
    wx.request({
      url: `https://gocargo-rails.osc-fr1.scalingo.io/api/v1/cars`,
      success(res){
        wx.removeStorage({ key: 'cars' })
        wx.setStorage({
          key: "cars",
          data: res.data
        })
        wx.navigateTo({
          url: `/pages/cars/index?city=${city}&brand=${brand}&startDate=${startDate}&endDate=${endDate}`
        })
      }
    })
  },
  bindStartDateChange(e){
    const input = e.detail.value
    this.setData({
      startDate: input
    })
  },
  bindEndDateChange(e){
    const input = e.detail.value
    this.setData({
      endDate: input
    })
  }
})