Component({
  data: {
    showHomeButton: false,
    showBackButton: false
  },
  ready() {
    let app = getApp()
    if(getCurrentPages()[getCurrentPages().length - 1].route !== "pages/cars/homepage"){
      if (getCurrentPages().length > 1) {
        this.setData({
          showBackButton: true,
        })
      } else if (!app.globalData.tab_bar_path.includes(getCurrentPages()[0].route)) {
        this.setData({
          showHomeButton: true,
         })
      }
    }
  },
  methods:{
    goHome: function(){
      wx.switchTab({
        url: '/pages/cars/homepage'
      })
    },
    goBack: function(){
      wx.navigateBack(1)
    }
  } 
})