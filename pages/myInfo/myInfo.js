var app = getApp()  
Page({  
  data: {  
    sexOptions: ['男', '女'],  
    date: "2016-09-01",
  },  
  onLoad: function () {  
    console.log('onLoad test');  
  },  
  saveMyInfo(e) {
    console.log(e.detail.value);
  }
})  