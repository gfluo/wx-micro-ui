import { ApiUrl, SignInResp } from "../../serverApi/index";

// src/pages/myinfo/myinfo.ts
Page({
  data: {
    userName: '',
    userSex: '性别未知'
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
              userSex: resp.data.data.user.sex,
              userName: resp.data.data.user.username,
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

  mydesc() {
    wx.navigateTo({
      url: '/src/pages/mydesc/mydesc'
    })
  },

  myauth() {
    wx.navigateTo({
      url: '/src/pages/myauth/myauth'
    })
  },
  myintro() {
    wx.navigateTo({
      url: '/src/pages/myintro/myintro'
    })
  },
  clockIn() {
    wx.navigateTo({
      url: '/src/pages/clockin/clockin'
    })
  },
  orders() {
    wx.navigateTo({
      url: '/src/pages/orders/orders'
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