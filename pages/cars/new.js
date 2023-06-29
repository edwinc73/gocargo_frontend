// pages/cars/new.js
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
      selected: 2
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
  submitNewCar(e){
    const app = getApp()
    const page = this
    // needs changing upon model change
    const car = {
      car_brand:e.detail.value.car_brand,
      car_model: e.detail.value.car_model,
      city: e.detail.value.city,
      price_per_day: e.detail.value.price_per_day,
      mileage: e.detail.value.mileage
    }
    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/cars`,
      method: 'POST',
      header: app.globalData.header,
      data: car,
      success(res){
        console.log(res)

        const tempFiles = page.data.tempFiles
        tempFiles.forEach(file => {
          wx.uploadFile({
            url: `${app.globalData.baseUrl}/api/v1/cars/${res.data.car.id}/upload_img`,
            filePath: file.tempFilePath,
            name: 'photos',
            header: app.globalData.header,
            success(res){
              console.log(res)
            },
            // complete(){
            //   wx.showToast({
            //     title: "Car Added",
            //   })
            //   wx.switchTab({
            //     url: '/pages/users/profile',
            //   })
            // }
          })
        });
      }
    })
  },
  uploadImage(){
    const page = this
    wx.chooseMedia({
      count: 9,
      mediaType: 'image',
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        console.log(res.tempFiles)
        page.setData({
          tempFiles: res.tempFiles
        })
      }
    })
  }
})