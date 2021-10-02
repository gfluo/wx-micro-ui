// app.js
App({
      onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        //先通过本地缓存获取openId
        const openId = wx.getStorageSync('openId')
        if (!openId) {  //通过服务器获取openId
          wx.login({
            success: res => {
              wx.request({
                url: `${this.globalData.apiServer}/api/wx/code`,
                method: "POST",
                data: {
                  code: res.code,
                },
                success: (resp) => {
                  if (resp.statusCode == 200 && resp.data.errno == 0) {
                    wx.setStorageSync('openId', resp.data.data.openId)
                  }
                }
              })
            }
          })
        }
      },
      globalData: {
        apiServer: 'https://www.szstswh.com'
      }
})