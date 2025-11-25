// src/pages/books/books.ts
import { ApiUrl, SaveBooksResp, SignInResp } from "../../serverApi/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [] as string[],
    newBook: ""
  },

  onInput(e: { detail: { value: string; }; }) {
    this.setData({
      newBook: e.detail.value
    });
  },

  saveBooks() {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.saveBooks,
      method: 'POST',
      data: {
        openId: openId,
        books: this.data.books.join(','),
      },
      success: (resp: {
        statusCode: number,
        data: SaveBooksResp,
      }) => {
        if (resp.statusCode === 200) {
          if (resp.data.errno === 0) { //已经获取用户信息
          } else {
            wx.showToast({
              title: '保存失败',
              icon: 'error', // 可选：'success' / 'error' / 'loading' / 'none'
              duration: 2000,  // 显示时长（ms）
            })
          }
        }
      }
    })
  },

  addBook(book: string) {
    const name = this.data.newBook.trim();
    if (!name) return;
    this.setData({
      books: [...this.data.books, name],
      newBook: ""
    });
    this.saveBooks();
  },

  removeBook(e: { currentTarget: { dataset: { index: number; }; }; }) {
    const index = e.currentTarget.dataset.index;
    let list = [...this.data.books];
    list.splice(index, 1);
    this.setData({
      books: list
    });
    this.saveBooks();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const openId = wx.getStorageSync('openId');
    wx.request({
      url: ApiUrl.signIn,
      method: 'POST',
      data: {
        openId: openId,
      },
      success: (resp: {
        statusCode: number,
        data: SignInResp,
      }) => {
        if (resp.statusCode === 200) {
          if (resp.data.errno === 0) { //已经获取用户信息
            const { books } = resp.data.data.user
            this.setData({
              books: books ? books.split(',') : [],
            })
          } else {
            wx.showToast({
              title: '获取失败',
              icon: 'error', // 可选：'success' / 'error' / 'loading' / 'none'
              duration: 2000,  // 显示时长（ms）
            })
          }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})