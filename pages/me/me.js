// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    // wx.stopPullDownRefresh()
    // },
    userName: '佚名',
    userSex: '性别未知'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: `${app.globalData.apiServer}/api/signIn`,
      method: 'POST',
      data: {
        openId: openId,
      },
      success: (resp) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) { //已经获取用户信息
            this.setData({
              userSex: resp.data.data.user.sex,
              userName: resp.data.data.user.username,
            })
          } else {
            console.log(resp.error)
          }
        }
      }
    })
  },
  exit: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  resetpwd: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../password/password?no=' + no,
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  },

  myinfor: function (e) {
    wx.navigateTo({
      url: '/pages/myinfor/mtinfor'
    })
  },
  myauth: function (e) {
    wx.navigateTo({
      url: '/pages/myauth/myauth'
    })
  },

  myintror: function (e) {
    wx.navigateTo({
      url: '/pages/myintro/myintro'
    })
  },
  test: function (e) {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },
  active: function (e) {
    wx.navigateTo({
      url: '/pages/myactive/myactive'
    })
  },
  myfavv: function (e) {
    wx.navigateTo({
      url: '/pages/myfav/myfav'
    })
  },
  myadv: function (e) {
    wx.navigateTo({
      url: '/pages/myadv/myadv'
    })
  },
  onShow: function () {
    this.setData({
      userName1: app.globalData.globalName,
      userSex1: app.globalData.globalSexMF,

    })

    console.log("name1" + app.globalData.globalName);
    console.log("tel1" + this.data.userSex1);
  },

  EventHandle: function () {
    var bol = this.data.boolean;

    this.setData({
      boolean: true
    })
  },
});