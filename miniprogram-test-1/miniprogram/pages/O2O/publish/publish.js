// miniprogram/pages/O2O/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addImageSrc:"/images/O2O/select_image.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSelectImage:function(event){
    var that=this;
    wx.chooseImage({
      count:1,
      success:function(result){
        that.setData({
          addImageSrc:result.tempFilePaths
        })
      },
      fail:function(error){
        that.setData({
          addImageSrc: "/images/O2O/select_image.png"
        })
      }
    })
  }
})