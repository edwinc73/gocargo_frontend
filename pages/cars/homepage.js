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
    console.log('hoempage onshow')
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
    console.log('form submit')
    const app = getApp()
    const inputs = e.detail.value
    const {city, brand, startDate, endDate} = inputs

    // if (!startDate || !endDate) {
    //   wx.showToast({
    //     title: 'Please select start date and end date',
    //     icon: 'none'
    //   });
    //   return;
    // }

    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/cars`,
      header: app.globalData.header,
      success(res){
        wx.removeStorage({ key: 'cars' })
        console.log(res)
        wx.setStorage({
          key: "cars",
          data: res.data
        })

        const cars = res.data.cars;
        const validCity = city === '' || cars.some(car => car.city.toLowerCase() === city.toLowerCase());
        const validBrand = brand === '' || cars.some(car => car.car_brand.toLowerCase() === brand.toLowerCase());
        
        if (city === '' && brand === '') {
          wx.navigateTo({
            url: `/pages/cars/index`
          });
          return;
        }
        
        if (!validCity || !validBrand) {
          wx.navigateTo({
            url: `/pages/cars/index?city=${city}&brand=${brand}&noResult=true`
          });
          return;
        }

        app.globalData.dates = [startDate, endDate]
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
