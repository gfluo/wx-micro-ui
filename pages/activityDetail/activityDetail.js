var app = getApp()

Page({
    data: {
        id: 0,
        cover: "https://tse1-mm.cn.bing.net/th/id/OIP-C.FaG6dzohGs3q45-DwsEyQQHaEK?w=317&h=180&c=7&r=0&o=5&pid=1.7",
        title: "相约下午茶",
        amount: 10,
        startTime: "2021-10-17 18:00:00",
        endTime: "",
        period: 5,
        describe: "<p>腾狮文化,非相亲活动，本活动不保证男女比例，可能全场是男生，也可能都是女生，报名请谨慎。</p><p>腾狮文化各项活动定位不是相亲社群，我们定位健康、开心、幸福。重要事情说三遍！健康、开心、幸福！健康、开心、幸福！健康、开心、幸福！</p>",
        address: "江苏省南京鼓楼区建宁路星妤小栈（阅江书院）",
        link: ["常规自我介绍。", "问答环节。", "认识新朋友。", "活动总结/夸夸。"],
        buttonDesc: '我要参加',
        ifJoin: false,
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        wx.request({
            url: `${app.globalData.apiServer}/api/activity/detail`,
            method: 'POST',
            data: {
                id: options.id
            },
            success: (resp) => {
                if (resp.statusCode == 200) {
                    if (resp.data.errno == 0) {
                        this.setData({
                            ...resp.data.data
                        })
                    }
                }
            }
        })
    },
    onReady: function () {
        const openId = wx.getStorageSync('openId')
        wx.request({
            url: `${app.globalData.apiServer}/api/activity/join/status`,
            method: 'POST',
            data: {
                openId,
                productId: this.data.id
            },
            success: (resp) => {
                if (resp.statusCode == 200 && resp.data.errno == 0) {
                    this.setData({
                        ifJoin: resp.data.data.ifJoin,
                        buttonDesc: resp.data.data.ifJoin ? "已参加" : "我要参加"
                    })
                }
                let activityEndDate = new Date(this.data.endTime).getTime()
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
    activityJoin: function () {
        const openId = wx.getStorageSync('openId')
        wx.request({
            url: `${app.globalData.apiServer}/api/activity/join`,
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
})