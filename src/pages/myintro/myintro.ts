// src/pages/myintro/myintro.ts
import { ApiUrl, SignInResp } from "../../serverApi/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: '',
    currentCount: 0,
  },

  onInput(e: { detail: { value: string } }) {
    this.setData({
      currentCount: e.detail.value.length,
      intro: e.detail.value
    })
  },

  onLoad() {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.signIn,
      method: 'POST',
      data: {
        openId: openId,
      },
      success: (resp: {
        statusCode: number,
        data: SignInResp,
      }) => {
        if (resp.statusCode === 200) {
          if (resp.data.errno === 0) { //已经获取用户信息
            this.setData({
              intro: resp.data.data.user.intro,
              currentCount: resp.data.data.user.intro.length,
            })
          } else {
            wx.showToast({
              title: '获取失败',
              icon: 'error', // 可选：'success' / 'error' / 'loading' / 'none'
              duration: 2000,  // 显示时长（ms）
            })
          }
        }
      }
    })
  },

  introSubmit: function () {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.saveIntro,
      method: 'POST',
      data: {
        intro: this.data.intro,
        openId: openId,
      },
      success: (resp: {
        statusCode: number,
        data: SignInResp,
      }) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {
            this.setData({
              ...resp.data.data
            })
            wx.showToast({
              title: "保存成功",
              icon: "success",
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: resp.data.error,
              icon: "error",
              duration: 2000,
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})