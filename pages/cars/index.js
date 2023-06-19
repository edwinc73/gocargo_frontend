// pages/cars/index.js
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
    this.setData({
      city: options.city,
      brand: options.brand,
      startDate: options.startDate,
      endDate: options.endDate
    })

    wx.getStorage({
      key: 'cars',
      success (res) {
        console.log("got storage")
        const cityFiltered = res.data.cars.filter( car => car.city.toLowerCase() == page.data.city.toLowerCase())
        page.setData({
          cars: cityFiltered
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
  goToCarsIndex(){
    wx.switchTab({
      url: '/pages/cars/index'
    })
  }
})