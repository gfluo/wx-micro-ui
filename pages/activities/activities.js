const app = getApp()

Page({
    data: {
        activities: [],
    },
    onShow: function () {
        wx.request({
            url: `${app.globalData.apiServer}/api/activities`,
            method: 'POST',
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
    }
})