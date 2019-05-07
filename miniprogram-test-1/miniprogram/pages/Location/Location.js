// miniprogram/pages/Location/Location.js
Page({

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
  /**
   * 得到城市名称
   */
  getLocationName:function(event){
    var thisx=this;
    //首先先拿到一个本地经纬度的数据
    wx.getLocation({
      type:"gcj02",
      success: function(res) {

        var key = "NLRBZ-2WY3D-SEC4S-PHNXB-FFK37-MUF2I";
        var url = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=" + key + "&";
        wx.cloud.callFunction({
          name: 'requesthttp',
          data: {
            url: url
          },
          success: (res) => {
            var location=JSON.parse(res.result);
            console.log(location);
            thisx.setData({
              location: location.result.address
            });
          },
          fail: (err) => {
            console.log(err);
          }
        });
      },
    });
  }
})