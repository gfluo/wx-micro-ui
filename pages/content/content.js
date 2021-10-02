// pages/content/content.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonDesc: '我要参加',
    ifJoin: false,
    contentid: 40,
    contentInfo: [],
    contentInfo1: [{
        content_price: 0.01,
        content_nameIntro: "中秋月圆时",
        content_activeTime: '活动时间：2021年10月19日 14：00-16：00',
        contentActivityEndDate: '2021-10-19 16:00:00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B8.jpg',
        content_coverPath: '../../image/B8.jpg'
      },

      {
        content_price: 40,
        content_nameIntro: "一起去看流星雨",
        content_activeTime: '活动时间：2021年9月19日 14：00-16：00',
        contentActivityEndDate: '2021-09-19 16:00:00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B5.jpg',
        content_coverPath: '../../image/B5.jpg',
      },
      {
        content_price: 40,
        content_nameIntro: "幸福人生",
        content_activeTime: '活动时间：2021年9月19日 14：00-16：00',
        contentActivityEndDate: '2021-09-19 16:00:00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B7.jpg',
        content_coverPath: '../../image/B7.jpg'
      },
      {
        content_price: 40,
        content_nameIntro: "禅意生活",
        content_activeTime: '活动时间：2021年9月19日 14：00-16：00',
        contentActivityEndDate: '2021-09-19 16:00:00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B9.jpg',
        content_coverPath: '../../image/B9.jpg'
      },
      {
        content_price: 40,
        content_nameIntro: "聊聊奥运",
        content_activeTime: '活动时间：2020年10月1日 14：00-16：00',
        contentActivityEndDate: '2020-10-01 16:00:00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B6.jpg',
        content_coverPath: '../../image/B6.jpg'
      },
      {
        content_price: 0.01,
        content_nameIntro: "职场中人际关系的沟通",
        content_activeTime: '活动时间：2021年10月2日 15：00-17：00',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B10.jpg',
        content_coverPath: '../../image/B10.jpg',
        contentActivityEndDate: '2021-10-02 17:00:00',
        content_Intro: "糟心的人际关系",
        content_Intro1: "你,需要被颂听",
        content_Intro2: "进入社会后",
        content_Intro3: "越来越多的人会告诉你",
        content_Intro4: "沟通十分重要",
        content_Intro5: "而沟通最重要的是倾听",
        content_Intro6: "可惜我们渐渐发现",
        content_Intro7: "在快节奏的环境下",
        content_Intro8: "很多人已没耐心倾听他人以致于你会发现",
        content_Intro9: "每次你在表达想法时",
        content_Intro10: "总会被别人打断",
        content_Intro11: "连完整表达的机会都没有连自己反思的机会都没有",
        content_Intro12: "其实，不是每次表达",
        content_Intro13: "都需要答案或建议",
        content_Intro14: "有一些表达也许仅仅是为了理清自己的思绪这样，",
        content_Intro15: "有助于寻找内心的答案",
        content_Intro16: "也许有一些话题或想法不适合对身边朋友诉说或找不到合适的倾听者",
        content_Intro17: "这个主题的活动就是!为了让大家一倾心中所想",
        content_Intro18: "说个痛快",
        content_Intro19: "想个透彻",
        content_Intro20: "分享中",
        content_Intro21: "表达自己的想法",
        content_Intro22: "还能体会到自己属于哪一种倾听者类型",
        content_Intro23: "整个活动过程",
        content_Intro24: "在蒙上眼睛的环境下进行",
        content_Intro25: "你可以尽情的",
        content_Intro26: "表达内心真实想法与感受",
        content_Intro27: "这是一次",
        content_Intro28: "倾听自己和倾听他人的体验，体验过的人都会发现",
        content_Intro29: "原来自己一直都没有好好被倾听过",
        content_Intro30: "整个过程中",
        content_Intro31: "没有任何的评论建议等",
        content_Intro32: "只有真真实实的自我想法与感受!",
        content_Intro33: "你需要做的是聆听自己的心声倾听他人的故事",
        content_Intro34: "阿德勒说过，",
        content_Intro35: "人的一切烦恼都源于人际关系。",
        content_Intro36: "不管是在职场，生活，感情，",
        content_Intro37: "我们都需要处理各种各样的人际关系，上级领导，同事客户、供应商、亲人、同学、朋友等等。",
        content_Intro38: "人际关系给你曾经带来过哪些困扰?"

      },
      {
        content_price: 0.01,
        content_nameIntro: "相约下午茶",
        content_activeTime: '活动时间：2021年9月14日 14：00-16：00',
        content_coverPath: '../../image/B11.jpg',
        address: '江苏省南京鼓楼区建宁路星妤小栈（阅江书院）',
        activityCover: '../../image/B11.jpg',
        contentActivityEndDate: '2021-09-14 16:00:00',
        content_Intro: "美好的下午时光",
        content_Intro1: "可以打扮成自己最喜欢的样子",
        content_Intro2: "云和最喜欢的人云吃下午茶",
        content_Intro3: "也可以和三五好友畅聊生活趣事",
        content_Intro4: "秋天的气息",
        content_Intro5: "在户外喝个下午茶",
        content_Intro6: "吹吹风，发发呆",
        content_Intro7: "你需要一段下午茶时光",
        content_Intro8: "只闻花香",
        content_Intro9: "不谈悲喜",
      },

    ]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      contentid: options.contentid
    })
  },

  onReady: function () {
    let cid = this.data.contentid;
    let cinfo;
    console.log("contentid" + cid);
    if (cid == 1) {
      cinfo = this.data.contentInfo1[0];
    }
    if (cid == 2) {
      cinfo = this.data.contentInfo1[1];
    }
    if (cid == 3) {
      cinfo = this.data.contentInfo1[2];
    }
    if (cid == 4) {
      cinfo = this.data.contentInfo1[3];
    }
    if (cid == 5) {
      cinfo = this.data.contentInfo1[4];
    }
    if (cid == 6) {
      cinfo = this.data.contentInfo1[5];
    }
    if (cid == 7) {
      cinfo = this.data.contentInfo1[6];
    }
    console.log(cinfo);
    this.setData({
      contentInfo: cinfo
    })

    const openId = wx.getStorageSync('openId')
    wx.request({
      url: `${app.globalData.apiServer}/api/activity/join/status`,
      method: 'POST',
      data: {
        openId,
        productId: this.data.contentid
      },
      success: (resp) => {
        if (resp.statusCode == 200 && resp.data.errno == 0) {
          this.setData({
            ifJoin: resp.data.data.ifJoin,
            buttonDesc: resp.data.data.ifJoin ? "已参加" : "我要参加"
          })
        }
        let activityEndDate = new Date(this.data.contentInfo.contentActivityEndDate).getTime()
        if (activityEndDate < new Date().getTime()) {
          console.log(new Date(activityEndDate))
          this.setData({
            ifJoin: true,
            buttonDesc: '活动已结束'
          })
        }
      }
    })
  },

  map: function (e) {
    wx.navigateTo({
      url: '/pages/map/ma['
    })
  },

  activityJoin: function () {
    const openId = wx.getStorageSync('openId')
    wx.request({
      url: `${app.globalData.apiServer}/api/activity/join`,
      method: 'POST',
      data: {
        openId,
        productId: this.data.contentid,
        amount: this.data.contentInfo['content_price'] * 100,
        title: this.data.contentInfo['content_nameIntro'],
        activityDate: this.data.contentInfo['content_activeTime'],
        address: this.data.contentInfo.address,
        imgSrc: this.data.contentInfo.activityCover,
      },
      success: (resp) => {
        if (resp.statusCode == 200) {
          if (resp.data.errno == 0) {
            wx.requestPayment({
              ...resp.data.data.orderCreateResp,
              "success": (res) => {
                console.log(res)
                this.setData({
                  ifJoin: true,
                  buttonDesc: '已参加',
                })
              },
              "fail": function (res) {
                console.error(res);
              },
              "complete": function (res) {
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
                    url: '/pages/myinfo/myinfo'
                  })
                }
              }
            })
          }
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})