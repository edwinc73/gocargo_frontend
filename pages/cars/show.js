// pages/cars/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    isFavourite: false,
    favouriteImage: '/images/icons/fav/fav.png',
  },

  toggleFavourite: function() {
    this.setData({
      isFavourite: !this.data.isFavourite,
      favouriteImage: this.data.isFavourite ? '/images/icons/fav/fav.png' : '/images/icons/fav/fav-active.png'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const app = getApp()
    const page = this
    page.setData({
      id: options.id
    })

    
    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/cars/${page.data.id}`,
      header: app.globalData.header,
      
      success(res){
        page.setData({
          car: res.data.car,
          owner: res.data.owner,
          photos: res.data.photos,
          noPhotos : res.data.photos.length == 0
        })
        const ownerRating = res.data.owner.rating
        const carRating = res.data.car.rating
    
        page.setData({
          ownerRating: ownerRating % 1 !== 0 ? ownerRating : ownerRating + ".0",
          carRating: carRating % 1 !== 0 ? carRating : carRating + ".0"
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
  }
})