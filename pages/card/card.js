// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   list:[
     {
       price: "价格：￥40",
       nameIntro:"中秋月圆时",
       activeTime:'活动时间：2021年9月19日 14：00-16：00',
       coverPath:'../../image/C2.png'
      },
      {
        price: "价格：￥0",    
        nameIntro:"一起去年流星雨",
        activeTime:'活动时间：2021年9月13日 19：00-21：00',
        coverPath:'../../image/C2.png'
       } ,
       {
        price: "价格：￥40",
        nameIntro:"中秋月圆时",
        activeTime:'活动时间：2021年9月19日 14：00-16：00',
        coverPath:'../../image/C2.png'
       },
       {
         price: "价格：￥0",    
         nameIntro:"一起去年流星雨",
         activeTime:'活动时间：2021年9月13日 19：00-21：00',
         coverPath:'../../image/C2.png'
        }  
    ]
  },

onClick :function() {
  this.setData ({
    wording: 'boy'
  })
  }
  })