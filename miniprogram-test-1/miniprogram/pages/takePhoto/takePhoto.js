// miniprogram/pages/takePhoto/takePhoto.js
Page({
  data:{
    buttoncolor:"red",
    cameraTurnOffIcon:"./cameraTurnOff.png",
    direction:"front"
  },
  
  takeAndUpload:function(){
    this.setData({ buttoncolor: "#800000"});
    this.setData({buttoncolor:"red"});
    //首先声明一个CameraContext 
    if(!wx.canIUse('createCameraContext')){ 
      console.log("出错了");
      return;
    } 
    var path = "image/" + (new Date()).getTime() + ".jpg";
    var tempath='';
    const cameraContext=wx.createCameraContext(); 
    //首先照相
    cameraContext.takePhoto({
      quilty:'high',
      
      success:res=>{
        tempath=res.tempImagePath;
        console.log(tempath);
        //然后上传
        wx.cloud.uploadFile({
          cloudPath: path,
          filePath: res.tempImagePath,
          success: function (res) {
            wx.showToast({
              title: 'sucecess',
            })
          },
          fail: function (err) {
            console.log(err);
          }
        });
      },

      fail:function(err){
        console.log(err);
      }
    });
    wx.cloud.callFunction({
      name:"inputdb",
      data:{
        path:path
      },
      success:(res)=>{
        console.log(res);
      },
      fail:(err)=>{
        console.log(err);
      }
    })
    this.data.buttoncolor="red";
  },
  touchBegin:function(event){
    this.setData({
      cameraTurnOffIcon:"./cameraTurnOff_1.png"
    });
    if(this.data.direction=="front")
    {
      this.setData({direction :"back"});
    }
    else{
      this.setData({direction:"front"});
    }
  },
  touchEnd: function (event) {
    this.setData({
      cameraTurnOffIcon: "./cameraTurnOff.png"
    });
  },
  goToSeePhoto:function(){
    wx.navigateTo({
      url: '../seePhoto/seePhoto',
    })
  }
})