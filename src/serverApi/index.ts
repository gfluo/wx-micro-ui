const BASE_URL = 'https://www.szstswh.com/fly';

export const ApiUrl = {
  wxLogin: `${BASE_URL}/api/wx/code`,
  getActivities: `${BASE_URL}/api/activities`,
  getActivityDetail: `${BASE_URL}/api/activity/detail`,
  activityJoin: `${BASE_URL}/api/activity/join`,
  activityJoinStatus: `${BASE_URL}/api/activity/join/status`,
  signIn: `${BASE_URL}/api/signIn`,
  register: `${BASE_URL}/api/register`,
  saveIntro: `${BASE_URL}/api/user/intro/save`,
  getOrders: `${BASE_URL}/api/activity/orders`,
}

export const FileUrl = {
  aboutus: `${BASE_URL}/images/aboutus.png`,
}

export interface WxLoginResp {
  errno: number,
  data?: {
    openId: string,
  }
}

export interface GetActivitiesResp {
  errno: number,
  data?: {
    activities: Activity[],
    hasNext: boolean
  }
}

export interface GetOrdersResp {
  errno: number,
  error: string,
  data: {
    orders: Order[],
  }
}

export interface Order {
  productId: string,
  address: string,
  imgSrc: string,
  orderStatus: string,
  title: string,
}

export interface SignInResp {
  errno: number,
  error: string,
  data: {
    user: {
      sex: string,
      username: string,
      birthday: string,
      intro: string,
    }
  }
}

export interface ActivityJoinStatusResp {
  errno: number,
  error: string,
  data: {
    ifJoin: boolean
  }
}

export interface ActivityJoinResp {
  errno: number,
  error: string,
  data: {
    orderCreateResp: {
      nonceStr: string,
      package: string,
      paySign: string,
      signType: SignType,
      timeStamp: string,
    }
  }
}

enum SignType {
  MD5 = "MD5",
  HMAC_SHA256 = "HMAC-SHA256",
  RSA = "RSA"
}

export interface getActivityDetailResp {
  errno: number,
  error: string,
  data: Activity
}

export interface Activity {
  id: number,
  title: string,
  address: string,
  amount: number,
  amountDescribe: string,
  cover: string,
  createdAt: string,
  describe: string,
  endTime: number,
  link: string[],
  period: string,
  qrcode: string,
  startTime: string,
}