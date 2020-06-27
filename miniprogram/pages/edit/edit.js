const db = wx.cloud.database()
const birthday = db.collection('birthday')

Page({
  data: {
    date: '点击设置生日'
  },

  dateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  onSubmit: function(e) {
    let info = e.detail.value
    let date = info.birthday.substring(5)
    info.date = date

    let id = this.data.id
    if (id == 'new') {
      let i = Math.ceil(Math.random() * 9)
      info.avatar = '../../images/avatar/00' + i + '.jpg'
      birthday.add({
        data: info,
        success: res => {
          wx.navigateBack()
        },
        fail: err => {
          wx.showToast({
            title: '保存失败',
          })
        }
      })
    }
    else {
      birthday.doc(id).update({
        data: info,
        success: res => {
          wx.navigateBack()
        },
        fail: err => {
          wx.showToast({
            title: '保存失败',
          })
        }
      })
    }
  },

  cancelEdit: function() {
    wx.navigateBack()
  },

  onLoad: function (options) {
    let id = options.id
    this.setData({
      id: id
    })
    if (id != 'new') {
      birthday.doc(id).get({
        success: res => {
          this.setData({
            info: res.data,
            date: res.data.birthday
          })
        }
      })
    }
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