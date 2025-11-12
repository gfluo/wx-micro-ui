const BASE_URL = 'https://www.szstswh.com';

export const ApiUrl = {
  wxLogin: `${BASE_URL}/api/wx/code`,
  getActivities: `${BASE_URL}/api/activities`,
}

export interface wxLoginResp {
  errno: number,
  data?: {
    openId: string,
  }
} 

export interface getActivitiesResp {
  errno: number,
  data?: {
    activities: Activity[],
    hasNext: boolean
  }
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
  link: string,
  period: string,
  qrcode: string,
  startTime: string,
}