import {
  Activity,
  ApiUrl,
  GetActivitiesResp
} from "../../serverApi/index";

Page({
  data: {
    searchValue: '',
    activities: [] as Activity[],
    page: 1,
    pagesize: 10,
    loading: false, // 加载状态
    noMore: false,  // 是否加载完
  },
  onSearchChange(event: { detail: string; }) {
    this.setData({
      searchValue: event.detail,
      page: 1,
      noMore: false,
    });
  },

  // 点击搜索按钮事件
  onSearchSubmit() {
    this.loadData(true);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadData();
  },

  onCardClick(e: { currentTarget: { dataset: { id: number; }; }; }) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/src/pages/activitydetail/activitydetail?id=' + activityId
  })
  },

  backToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },

  loadData(clear: boolean = false) {
    if (this.data.noMore) {
      return
    }
    if (this.data.loading || this.data.noMore) return
    this.setData({ loading: true })
    wx.request({
      url: ApiUrl.getActivities,
      method: "GET",
      data: {
        query: this.data.searchValue,
        page: this.data.page,
        pagesize: this.data.pagesize
      },
      success: (apiServerResp: {
        statusCode: number,
        data: GetActivitiesResp
      }) => {
        if (apiServerResp.statusCode == 200 && apiServerResp.data.errno == 0) {
          this.setData({
            activities: clear ? apiServerResp.data.data!.activities : [...this.data.activities, ...apiServerResp.data.data!.activities],
            page: apiServerResp.data.data!.hasNext ? this.data.page + 1 : this.data.page + 1,
            loading: false,
            noMore: !apiServerResp.data.data!.hasNext,
          })
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
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})