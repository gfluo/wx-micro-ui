import { ApiUrl, WxLoginResp } from "src/serverApi/index";

App({
  onLaunch() {
    const openId: string = wx.getStorageSync('openId');
    // 获取当前app的openId
    if (!openId) {
      wx.login({
        success: (res) => {
          wx.request({
            url: ApiUrl.wxLogin,
            method: "POST",
            data: {
              code: res.code,
            },
            success: (apiServerResp: {
              statusCode: number,
              data: WxLoginResp
            }) => {
              if (apiServerResp.statusCode == 200 && apiServerResp.data.errno == 0) {
                wx.setStorageSync('openId', apiServerResp.data.data!.openId)
              }
            }
          })
        }
      })
    }
  }
})