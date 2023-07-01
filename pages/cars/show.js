// pages/cars/show.js
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
    const app = getApp()
    const page = this
    page.setData({
      id: page.options.id
    })

    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/cars/${page.data.id}`,
      header: app.globalData.header,
      
      success(res){
        page.setData({
          car: res.data.car,
          owner: res.data.owner,
          photos: res.data.photos,
          noPhotos : res.data.photos.length == 0,
          favourite: res.data.favourited,
          isFavourite: res.data.favourited.is_favourited,
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
  },
  addToFavourite(){
    const page = this
    const app = getApp()
    const favourite = page.data.favourite
    if(favourite){
      wx.request({
        url: `${app.globalData.baseUrl}/api/v1//favourite_cars/${page.data.favourite.id}`,
        method: "PUT",
        header: app.globalData.header,
        data: {user_id: app.globalData.user.id, car_id:page.data.car.id, is_favourited:!page.data.isFavourite},
        success(res){
          page.setData({
            isFavourite: !page.data.isFavourite
          });
        }
      })
    } else {
      wx.request({
        url: `${app.globalData.baseUrl}/api/v1//favourite_cars`,
        method: "POST",
        header: app.globalData.header,
        data: {user_id: app.globalData.user.id, car_id:page.data.car.id, is_favourited:true},
        success(){
          page.setData({
            isFavourite: true,
            favouriteImage: '/images/icons/fav/fav-active.png'
          });
        }
      })
    }
  }

})