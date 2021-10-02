// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   list:[
    {
      id:7,
       price: 19,
        nameIntro:" 相约下午茶",
        activeTime:'活动时间：2021年9月14日 14：00-16：00',
        coverPath:'../../image/B11.jpg'
       },
    {
      id:6,
       price: 19,
        nameIntro:" 职场中人际关系的沟通",
        activeTime:'活动时间：2021年9月3日 15：00-17：00',
        coverPath:'../../image/B10.jpg'
       },
    {
      id:5,
       price: 40,
        nameIntro:"聊聊奥运",
        activeTime:'活动时间：2021年8月19日 14：00-16：00',
        coverPath:'../../image/B6.jpg'
       },
     {
     id:1,
      price: 40,
       nameIntro:"中秋月圆时",
       activeTime:'活动时间：2021年9月19日 14：00-16：00',
       coverPath:'../../image/B8.jpg'
      },
      {
       id:2,
        price: 40,    
        nameIntro:"一起去看流星雨",
        activeTime:'活动时间：2021年9月13日 19：00-21：00',
        coverPath:'../../image/B5.jpg'
       } ,
       {
        id:3,
        price: 40,
        nameIntro:"幸福人生",
        activeTime:'活动时间：2021年9月19日 14：00-16：00',
        coverPath:'../../image/B7.jpg'
       },
       {
        id:4,
         price: 40,    
         nameIntro:"禅意生活",
         activeTime:'活动时间：2021年9月13日 19：00-21：00',
         coverPath:'../../image/B9.jpg'
        }  
    ]
  },

onClick :function() {
  this.setData ({
    wording: 'boy'
  })
  },
  enterContent: function(e){
  var  that=this
  let  contentid = e.currentTarget.dataset.id;
  console.log(e)
  console.log(contentid);
  wx.navigateTo({
    url:'/pages/content/content?contentid='+contentid
  })
},
/**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
