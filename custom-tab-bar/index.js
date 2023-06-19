Component({
  data: {
    selected: 0,
    color: "#1d1d1d",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/homepage/homepage",
      iconPath: "/images/icons/tabBar/tab-bar-icon-inactive-search.png",
      selectedIconPath: "/images/icons/tabBar/tab-bar-icon-active-search.png"
    }, {
      pagePath: "/pages/bookings/show",
      iconPath: "/images/icons/tabBar/tab-bar-icon-inactive-calendar.png",
      selectedIconPath: "/images/icons/tabBar/tab-bar-icon-active-calendar.png"
    }, {
      pagePath: "/pages/users/profile",
      iconPath: "/images/icons/tabBar/tab-bar-icon-inactive-profile.png",
      selectedIconPath: "/images/icons/tabBar/tab-bar-icon-active-profile.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})