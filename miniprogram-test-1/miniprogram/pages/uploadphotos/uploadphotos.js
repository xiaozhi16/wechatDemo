// miniprogram/pages/uploadphotos/uploadphotos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 图片上传
   */
  Uploader:function(){
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = "image/"+(new Date().getTime())+".jpg";
        console.log(cloudPath);
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            wx.cloud.callFunction({
              name:"inputdb",
              data:{
                path:cloudPath
              },
            })
            console.log('[上传文件] 成功：', res)
            wx.showToast({
              title: 'success',
            });
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    });

  },

  /**
   *拍照上传 
   */
  gotophotoUploader:function(){
    wx.navigateTo({
      url: '../takePhoto/takePhoto',
    })
  },


  /**
   * 上传照片查看
   */
  goToSeePhoto:function(event){
    wx.navigateTo({
      url: "../seePhoto/seePhoto",
    })
  }
})