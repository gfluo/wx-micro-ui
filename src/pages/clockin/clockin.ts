// src/pages/clockin/clockin.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      {
        name: "古法健身养生",
        desc: "古法健身养生",
        url: "/pages/main_module/pages/habit_detail_v3/habit_detail_v3?from=minaPath&habitId=6405985&byUserId=ochvq0P4VbvWjVZYhxUh6bqrTeXs",
        color1: "#FF6F61",
        color2: "#FF8E53"
      },
      {
        name: "中文经典诵读",
        desc: "中文经典诵读",
        url: "/pages/main_module/pages/habit_detail_v3/habit_detail_v3?from=minaPath&habitId=7492272&byUserId=ochvq0P4VbvWjVZYhxUh6bqrTeXs",
        color1: "#42A5F5",
        color2: "#5C6BC0"
      },
      {
        name: "英文经典诵读",
        desc: "英文经典诵读",
        url: "/pages/main_module/pages/habit_detail_v3/habit_detail_v3?from=minaPath&habitId=8943005&byUserId=ochvq0P4VbvWjVZYhxUh6bqrTeXs",
        color1: "#66BB6A",
        color2: "#43A047"
      }
    ]
  },

  goToPage(e: { currentTarget: { dataset: { url: string; }; }; }) {
    wx.navigateToMiniProgram({
      appId: 'wx855c5d7718f218c9',
      path: e.currentTarget.dataset.url,
      extraData: {
        byAction: '70099',
        byCurPage: 'habit_detail_v3',
        byPage: 'habit_detail_v3',
      },
      envVersion: 'release',
      success(res) {
        console.log(res);
      }
    })
    // wx.navigateTo({ url: e.currentTarget.dataset.url });
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