// miniprogram/pages/seePhoto/seePhoto.js
//const dataload=require("./dataload.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var db=wx.cloud.database();
    var thisx=this;
    db.collection("calculator").doc("ce1079d8-18f9-4dc9-ba4f-da0ce097dfc7").get({
      success: (res) => {
        console.log(res);
        var fileiD=res.data.fileID;
        thisx.setData({fileID:fileiD});
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
 
})