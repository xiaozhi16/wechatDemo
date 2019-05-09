// miniprogram/pages/takePhoto/takePhoto.js
Page({
  data:{
    buttoncolor:"red",
    cameraTurnOffIcon:"./cameraTurnOff.png",
    direction:"front",
    photoURL:""
  },
  onLoad:function(options){
    var thisx = this;
    wx.cloud.database().collection("calculator").doc("ce1079d8-18f9-4dc9-ba4f-da0ce097dfc7").get({
      success: function (res) {
        console.log(res.data.fileID[0]);
        thisx.setData({
          photoURL: res.data.fileID[0]
        });
      }
    });
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
    var thisx = this;
    wx.cloud.database().collection("calculator").doc("ce1079d8-18f9-4dc9-ba4f-da0ce097dfc7").get({
      success: function (res) {
        console.log(res.data.fileID[0]);
        thisx.setData({
          photoURL: res.data.fileID[0]
        });
      }
    });
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