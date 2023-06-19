// pages/homepage/homepage.js
Page({

  /**
   * Page initial data
   */
  data: {
    city: '',
    brand: '',
    date: '',
    today: ''
  },
  onCityInput: function(event) {
    this.setData({
      city: event.detail.value
    });
  },

  onBrandInput: function(event) {
    this.setData({
      brand: event.detail.value
    });
  },

  bindDateChange: function(event) {
    this.setData({
      date: e.detail.value
    });
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

  }
})