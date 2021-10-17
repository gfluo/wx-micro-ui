var app = getApp()  
Page({  
  data: {  
    sexOptions: ['男', '女'],  
    sexDefaultIndex: 0,
    sexSelect: '男',
    birthday: "2000-01-01",
    username: "",
    occupation: "",
    mobile: "",
    address: "",
    interest: "",
  },  
  onLoad: function () {  
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
              let index = this.data.sexOptions.indexOf(self.data.sex);
              this.setData({
                sexSelect: self.data.sex,
                sexDefaultIndex: index
              })
            }
          } else {
            console.log(resp.data.error)
          }
        } 
      }
    })   
  },  
  saveMyInfo(e) {
    if (e.detail.value.username == "") {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (e.detail.value.mobile == "") {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const openId = wx.getStorageSync('openId')
    wx.request({
      url: `${app.globalData.apiServer}/api/register`,
      method: 'POST',
      data: {
        openId,
        sex: this.data.sexSelect,
        username: e.detail.value.username,
        birthday: this.data.birthday,
        address: e.detail.value.address,
        mobile: e.detail.value.mobile,
        occupation: e.detail.value.occupation,
        interest: e.detail.value.interest,
      },
      success: (resp) => {
        if (resp.data.errno == 0) {
          wx.switchTab({
            url: '/pages/me/me',
          })
        } else {
          wx.showToast({
            title: resp.data.error,
            icon: 'none',
            duration: 2000
          })
          return
        }
        console.log(resp.data.error)
      }
    });
  },
  sexChange: function (e) {
    this.setData({
      sexSelect: this.data.sexOptions[e.detail.value]
    })
  },
  birthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  }
})  