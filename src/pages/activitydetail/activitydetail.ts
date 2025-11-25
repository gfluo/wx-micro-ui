import { ActivityJoinResp, ActivityJoinStatusResp, ApiUrl, getActivityDetailResp } from "../../serverApi/index";

// src/pages/activitydetail/activitydetail.ts
wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage']
})
Page({
  data: {
    loading: true,
    id: 0,
    cover: "https://tse1-mm.cn.bing.net/th/id/OIP-C.FaG6dzohGs3q45-DwsEyQQHaEK?w=317&h=180&c=7&r=0&o=5&pid=1.7",
    title: "相约下午茶",
    amount: 10,
    amountDescribe: "",
    startTime: "2021-10-17 18:00:00",
    endTime: 0,
    period: '',
    describe: "<p>家灏,非相亲活动，本活动不保证男女比例，可能全场是男生，也可能都是女生，报名请谨慎。</p><p>家好教育家灏各项活动定位不是相亲社群，我们定位健康、开心、幸福。重要事情说三遍！健康、开心、幸福！健康、开心、幸福！健康、开心、幸福！</p>",
    address: "江苏省南京鼓楼区建宁路星妤小栈（阅江书院）",
    link: ["常规自我介绍。", "问答环节。", "认识新朋友。", "活动总结/夸夸。"],
    buttonDesc: '我要参加',
    ifJoin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: { scene?: string; id: string; }) {
    let id;
    if (options.scene) {    //通过扫码过来的请求，需要接码
      const scene = decodeURIComponent(options.scene);
      const params = scene.split('=');
      id = parseInt(params[1]);
    } else {
      id = parseInt(options.id)
    }

    wx.request({
      url: ApiUrl.getActivityDetail,
      method: 'POST',
      data: {
        id: id
      },
      fail: () => {
        this.setData({
          loading: false
        })
      },
      success: (apiServerResp: {
        statusCode: number,
        data: getActivityDetailResp
      }) => {
        if (apiServerResp.statusCode == 200) {
          if (apiServerResp.data.errno == 0) {
            this.setData({
              ...apiServerResp.data.data,
              link: apiServerResp.data.data.link.filter((l) => ( l !== ''))
            });
            this.joinStatusCheck();
          }

          this.setData({
            loading: false
          })
        }
      }
    })
  },

  activityJoin: function () {
    const openId = wx.getStorageSync('openId')
    wx.request({
      url: ApiUrl.activityJoin,
      method: 'POST',
      data: {
        openId,
        productId: this.data.id,
        amount: this.data.amount * 100,
        title: this.data.title,
        activityDate: this.data.startTime,
        address: this.data.address,
        imgSrc: this.data.cover,
      },
      success: (resp: {
        statusCode: number,
        data: ActivityJoinResp,
      }) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {
            wx.requestPayment({
              ...resp.data.data.orderCreateResp,
              success: (_res) => {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success', // 可选：'success' / 'error' / 'loading' / 'none'
                  duration: 2000,  // 显示时长（ms）
                })
                this.setData({
                  ifJoin: true,
                  buttonDesc: '已参加',
                })
              },
              fail: function (_res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'error', // 可选：'success' / 'error' / 'loading' / 'none'
                  duration: 2000,  // 显示时长（ms）
                })
              },
              complete: function (res) {
                console.log("ok");
              }
            })
          } else {
            wx.showToast({
              title: resp.data.error,
              icon: "none",
              duration: 2000,
              complete: (e) => {
                if (resp.data.errno == -7) {
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
  },
  joinStatusCheck() {
    if (this.data.amount > 0) {
      const openId = wx.getStorageSync('openId');
      wx.request({
        url: ApiUrl.activityJoinStatus,
        method: 'POST',
        data: {
          openId,
          productId: this.data.id
        },
        success: (resp: {
          statusCode: number,
          data: ActivityJoinStatusResp
        }) => {
          if (resp.statusCode == 200 && resp.data.errno == 0) {
            this.setData({
              ifJoin: resp.data.data.ifJoin,
              buttonDesc: resp.data.data.ifJoin ? "已参加" : "我要参加"
            })
          }
          let activityEndDate = new Date(this.data.endTime).getTime()
          if (activityEndDate < new Date().getTime()) {
            // console.log(new Date(activityEndDate))
            this.setData({
              ifJoin: true,
              buttonDesc: '活动已结束'
            })
          }
        }
      })
    } else {
      this.setData({
        ifJoin: true,
        buttonDesc: '无需支付'
      })
      let activityEndDate = new Date(this.data.endTime).getTime()
      if (activityEndDate < new Date().getTime()) {
        // console.log(new Date(activityEndDate))
        this.setData({
          ifJoin: true,
          buttonDesc: '活动已结束'
        })
      }
    }
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
    return {
      path: '/src/pages/activitydetail/activitydetail?id=' + this.data.id
    }
  },
  onShareTimeline() {
    return {
      title: this.data.title,
      imageUrl: this.data.cover, // 图片 URL
    }
  }
})