// pages/bookings/show.js
Page({
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
    const page = this;
    const app = getApp()
    const id = page.options.id
    wx.request({
      url: `${app.globalData.baseUrl}/api/v1/bookings/${id}`,
      header: app.globalData.header,
      success(res){
        const car = res.data.car
        const owner = res.data.car
        const renter = res.data.renter
        const current_user = app.globalData.user
        console.log(res)
        page.setData({
          car: res.data.car,
          booking: res.data.booking,
          renter: res.data.renter,
          owner: res.data.owner,
          showApprove: current_user == owner
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

  tapApprove() {
    let id = this.data.booking.id;
    const app = getApp()
    wx.showModal({
      title: 'Approve',
      content: 'Are you sure?',
      showCancel: true,
      cancelText: "cancel",
      confirmText: "approve",
      success: (res) => {
        if (res.confirm) {
          wx.request({
      header: app.globalData.header,
            url: `${app.globalData.baseUrl}/api/v1/bookings/${id}`,
            header: app.globalData.header,
            method: 'PUT',
            data: {approved: true},
            success() {
              wx.showToast({
                title: 'Approved',
              })
              wx.redirectTo({
                url: `/pages/bookings/show?id=${id}`,
              })
            }
          });
        }
      },
    });
  },

  tapCancel(){
    const app = getApp()
    let id = this.data.booking.id;
    wx.showModal({
      title: 'Cancel',
      content: 'Are you sure?',
      showCancel: true,
      cancelText: "cancel",
      confirmText: "confirm",
      success: (res) => {
        if (res.confirm) {
          let booking = {
            cancelled: true
          };
          wx.request({
            url: `${app.globalData.baseUrl}/api/v1/bookings/${id}`,
            method: 'PUT',
            header: app.globalData.header,
            data: booking,
            success() {
              wx.switchTab({
                url: `/pages/bookings/index`
              });
            }
          });
        }
      },
    });
  }
})