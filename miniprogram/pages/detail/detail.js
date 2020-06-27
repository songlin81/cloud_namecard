var utils = require('../../utils/utils.js')

const db = wx.cloud.database()
const birthday = db.collection('birthday')

Page({
  data: {
  },

  editFriend: function() {
    let id = this.data.id
    wx.navigateTo({
      url: '../edit/edit?id=' + id
    })
  },

  deleteFriend: function() {
    let id = this.data.id
    birthday.doc(id).remove({
      success: res => {
        wx.navigateBack()
      }
    })
  },

  onLoad: function (options) {
    let id = options.id
    let n2 = options.n2
    this.setData({
      id: id,
      n2: n2
    })
  },

  onReady: function () {
  },

  onShow: function () {
    let id = this.data.id
    birthday.doc(id).get({
      success: res => {
        let today = utils.getToday()
        let y = utils.getFullYear()
        let b_day = res.data.birthday
        let n1 = utils.dateDiff(b_day, today)
        this.setData({
          info: res.data,
          n1: n1
        })
      }
    })
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