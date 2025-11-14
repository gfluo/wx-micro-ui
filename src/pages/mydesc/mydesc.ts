import { ApiUrl, SignInResp } from "../../serverApi/index";
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexOptions: ['男', '女', '保密'],
    sex: '男',
    birthday: "2000-01-01",
    username: "",
    occupation: "",
    mobile: "",
    address: "",
    interest: "",
    showSexPicker: false,
    showCalendar: false,
    minDate: new Date(1980, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
  },
  openCalendar() {
    this.setData({
      showCalendar: true,
    })
  },
  closeCalendar() {
    this.setData({
      showCalendar: false,
    })
    console.log('2222222222')
  },
  onBirthdayConfirm() {
    this.setData({
      showCalendar: false,
      birthday: this.formatDate()
    })
  },
  onBirthdayChange(e: { detail: number; }) {
    this.setData({
      currentDate: e.detail,
    })
  },
  openSexPicker() {
    this.setData({
      showSexPicker: true,
    })
  },
  closeSexPicker() {
    this.setData({ showSexPicker: false });
  },
  onSexConfirm(e: { detail: { value: string; }; }) {
    this.setData({
      sex: e.detail.value,
      showSexPicker: false
    });
  },

  formatDate() {
    const curr = new Date(this.data.currentDate);
    return `${curr.getFullYear()}-${curr.getMonth()}-${curr.getDay()}`
  },

  submitDesc(e: {
    detail: {
      value: {
        username: string,
        mobile: string,
        address: string,
        occupation: string,
        interest: string,
      };
    };
  }) {
    const { username, mobile, address, occupation, interest } = e.detail.value;
    if (!username || !mobile) {
      Notify({ type: 'warning', message: '昵称、联系方式不能为空', });
      return;
    }
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.register,
      method: 'POST',
      data: {
        openId,
        sex: this.data.sex,
        username: username,
        birthday: this.formatDate(),
        address: address,
        mobile: mobile,
        occupation: occupation,
        interest: interest,
      },
      success: (resp: {
        statusCode: number,
        data: SignInResp,
      }) => {
        if (resp.data.errno == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success', // 可选：'success' / 'error' / 'loading' / 'none'
            duration: 2000,  // 显示时长（ms）
          })
        } else {
          wx.showToast({
            title: resp.data.error,
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
    });
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
        if (resp.statusCode == 200) {
          if (resp.data.errno === 0) {   //已经获取用户信息
            this.setData({
              ...resp.data.data.user,
              currentDate: new Date(resp.data.data.user.birthday).getTime(),
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