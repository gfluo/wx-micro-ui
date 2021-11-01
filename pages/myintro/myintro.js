// pages/myintro/myintro.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: '',
  },
  introSubmit: function (e) {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: `${app.globalData.apiServer}/api/user/intro/save`,
      method: 'POST',
      data: {
        intro: e.detail.value.textarea,
        openId: openId,
      },
      success: (resp) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {
            this.setData({
              ...resp.data.data
            })
            wx.showToast({
              title: "保存成功",
              icon: "none",
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: resp.data.error,
              icon: "none",
              duration: 2000,
              complete: (e) => {
                if (resp.data.errno == -21) {
                  wx.navigateTo({
                    url: '/pages/myInfo/myInfo'
                  })
                }
              }
            })
          }
        }
      }
    })
    console.log(e.detail.value.textarea)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openId = wx.getStorageSync('openId');
    const self = this;
    wx.request({
      url: `${app.globalData.apiServer}/api/signIn`,
      method: 'POST',
      data: {
        openId: openId,
      },
      success: (resp) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {   //已经获取用户信息
            self.setData({
              ...resp.data.data.user
            })
          } else {
            console.log(resp.data.error)
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  
  onReachBottom: function () {

  },
  
  onShareAppMessage: function () {

  }
})