import { ApiUrl, CreateAdviseResp } from "../../serverApi/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advise: '',
    currentCount: 0,
  },
  onInput(e: { detail: { value: string } }) {
    this.setData({
      currentCount: e.detail.value.length,
      advise: e.detail.value
    })
  },
  introSubmit: function () {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.createAdivse,
      method: 'POST',
      data: {
        advise: this.data.advise,
        openId: openId,
      },
      success: (resp: {
        statusCode: number,
        data: CreateAdviseResp,
      }) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {
            this.setData({
              advise: '',
              currentCount: 0,
            })
            wx.showToast({
              title: "提交成功",
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
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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