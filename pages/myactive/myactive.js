// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    activities: []
  },

  onClick: function () {
    this.setData({
      wording: 'boy'
    })
  },
  enterContent: function (e) {
    var that = this
    let contentid = e.currentTarget.dataset.id;
    console.log(e)
    console.log(contentid);
    wx.navigateTo({
      url: '/pages/content/content?contentid=' + contentid
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onLoad: function () {
    const openId = wx.getStorageSync('openId')
    wx.request({
      url: `${app.globalData.apiServer}/api/activity/orders`,
      method: 'POST',
      data: {
        openId,
      },
      success: (resp) => {
        if (resp.statusCode == 200) {
          this.setData({
            activities: resp.data.data.orders
          })
          console.log(this.data.activities)
        }
      }
    })
  }
})