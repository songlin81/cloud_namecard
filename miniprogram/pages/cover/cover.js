var app = getApp()

Page({
  data: {
    src: '/images/logo.png',
    showLogin: true,
  },

  getMyInfo: function (e) {
    let that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      if (app.globalData.openid==null){
        wx.cloud.callFunction({
          name:'getOpenId',
          complete:res=>{
            app.globalData.openid = res.result.openid
            that.setData({
              showLogin: false,
              userInfo: app.globalData.userInfo
            })
          }
        })
      }
    } else {
      this.setData({
        showLogin: true
      })
    }
  },

  goToIndex: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})