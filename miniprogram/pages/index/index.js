var utils = require('../../utils/utils.js')

const db = wx.cloud.database()
const birthday = db.collection('birthday')

Page({
  data: {
  },

  addFriend: function(options) {
    let id = 'new'
    wx.navigateTo({
      url: '../edit/edit?id=' + id
    })
  },

  onCancel: function(e) {
    this.getFriendsList()
  },

  onSearch: function(e) {
    let keyword = e.detail
    birthday.where({
      name: db.RegExp({
        regexp: keyword,
        options: 'i',
      })
    }).orderBy('date', 'asc').get({
      success: res => {
        this.processData(res.data)
      }
    })
  },

  getFriendsList: function() {
    birthday.orderBy('date', 'asc').get({
      success: res => {
        this.processData(res.data)
      }
    })
  },

  processData: function(list) {
    for (var i = 0; i < list.length; i++) {
      let date = list[i].date
      let n = utils.getNextBirthday(date)
      list[i].n = n
    }
    this.setData({
      friendsList: list
    })
  },

  onLoad: function(options) {
  },
  onReady: function() {
  },

  onShow: function() {
    this.getFriendsList()
  },

  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
  },
  onReachBottom: function() {
  },
  onShareAppMessage: function() {
  }
})