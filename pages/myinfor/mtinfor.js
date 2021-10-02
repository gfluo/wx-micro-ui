// pages/myinfor/mtinfor.js
var app = getApp()
Page({
  /**   * 页面的初始数据   */
  data: {
    username: "",
    sex: "男",
    sexShows: [{
      value: '男',
      checked: true,
    }, {
      value: '女',
    }], 
    birthday: "",
    mobile: "",
    address: "",
    occupation: "",
    interest: "",
  },

  sexChange: function (e) {
    let sex = e.detail.value
    this.setData({
      sex: sex == "male" ? "男" : "女"
    })
    console.log(this.data.sex)
  },

  mobileChange: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  usernameChange: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  birthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  occupationChange: function (e) {
    this.setData({
      occupation: e.detail.value
    })
  },

  addressChange: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  interestChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      interest: e.detail.value
    })
  },

  
  //提交
  infoSubmit: function (e) {
    const openId = wx.getStorageSync('openId')
    if (this.data.sex == "") {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.address == '') {
      wx.showToast({
        title: '请输入联系地址',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.birthday == '') {
      wx.showToast({
        title: '请输入出生年月',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.occupation == '') {
      wx.showToast({
        title: '请输入职业',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.interest == '') {
      wx.showToast({
        title: '请输入兴趣爱好',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.request({
      url: `${app.globalData.apiServer}/api/register`,
      method: 'POST',
      data: {
        openId,
        sex: this.data.sex,
        username: this.data.username,
        birthday: this.data.birthday,
        address: this.data.address,
        mobile: this.data.mobile,
        occupation: this.data.occupation,
        interest: this.data.interest,
      },
      success: (resp) => {
        console.log(resp.data.error)
      }
    })

    wx.switchTab({
      url: '/pages/me/me',
    })
    app.globalData.globalName = this.data.GName;

    /*
    if (this.data.GName) {
      wx.switchTab({
        url: '/pages/me/me',
      })
      app.globalData.globalName = this.data.GName;
    } else {
      wx.showModal({
        title: '姓名不能为空',
        content: '请输入姓名',
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确定")
          }
        }

      })
    }
    app.globalData.globalSexMF = this.data.SexMF;
    app.globalData.globalTel = this.data.GTel;
    app.globalData.globalSex = this.data.GSex;
    app.globalData.globalDate = this.data.GDate;
    app.globalData.globalArea = this.data.GArea;
    app.globalData.globalOcc = this.data.GOcc;
    app.globalData.globalEnj = this.data.GEnj;
    console.log("SEX=" + app.globalData.globalSexMF)
    console.log("SEsssX=" + this.data.SexMF)
    console.log("Area=" + app.globalData.globalEnj)
    console.log("AreaAAA=" + this.data.GEnj)
    */
  },
  //   /**
  //    * 生命周期函数--监听页面加载
  //    */
  onLoad: async function (options) {

  },

  //   /**
  //    * 生命周期函数--监听页面初次渲染完成
  //    */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
            if (self.data.sex == "男") {
            } else {
              this.data.sexShows[1].checked = true
              this.setData({
                sexShows: this.data.sexShows
              })
            }
            console.log(self.data)
          } else {
            console.log(resp.data.error)
          }
        } 
      }
    })   
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})