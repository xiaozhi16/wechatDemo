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
        var fileiD=res.data.fileID;
        thisx.setData({fileID:fileiD});
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
 //长按删除
 delphoto:function(event){
   var thisx=this;
   wx.showModal({
     title: '提示',
     confirmText: '删除',
     cancelText: '取消',
     content: '确定删除此图片？',
     success:(res)=>{
       var fileid = thisx.data.fileID
       fileid.splice(event.currentTarget.dataset.fileidIndex, 1);
       thisx.setData({
         fileID: fileid
       });
       if( res.cancel== false && res.confirm == true ){
         wx.cloud.deleteFile({
          fileList:["event.currentTarget.dataset.fileid"]
         });
         wx.cloud.callFunction({
           name:"delFileid",
           data: {
             fileid:fileid,
           },
          success:(res)=>{
            wx.showToast({
              title: '删除成功',
            })
          }
         });
       }
     }
    });
 }
})