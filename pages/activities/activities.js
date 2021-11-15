const app = getApp()

Page({
    data: {
        activities: [],
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
        wx.request({
            url: `${app.globalData.apiServer}/api/activities`,
            method: 'POST',
            data: {
                query: this.data.inputVal
            },
            success: (resp) => {
                if (resp.statusCode == 200) {
                    if (resp.data.errno == 0) {
                        this.setData({
                            activities: resp.data.data.activities
                        })
                    }
                }
            }
        })
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
        wx.request({
            url: `${app.globalData.apiServer}/api/activities`,
            method: 'POST',
            data: {
                query: this.data.inputVal,
            },
            success: (resp) => {
                if (resp.statusCode == 200) {
                    if (resp.data.errno == 0) {
                        if (resp.data.data.activities.length > 0) {
                            this.setData({
                                activities: resp.data.data.activities
                            })
                        }
                    }
                }
            }
        })
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    onShow: function () {
        wx.request({
            url: `${app.globalData.apiServer}/api/activities`,
            method: 'POST',
            data: {
                query: this.data.inputVal
            },
            success: (resp) => {
                if (resp.statusCode == 200) {
                    if (resp.data.errno == 0) {
                        this.setData({
                            activities: resp.data.data.activities
                        })
                    }
                }
            }
        })
    },
    enterContent: function (e) {
        let activityId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/activityDetail/activityDetail?id=' + activityId
        })
    },
    onShareAppMessage: function (object) {
        return {
            path: '/pages/activities/activities'
        }
    },
    onShareTimeline: () => {
        return {
            imageUrl: '', // 图片 URL
        }
    }
})