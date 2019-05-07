Page({
  data:{
    result:[],
    packageType:[
      {name:'中通',value:'zhongtong'},
      {name:'邮政',value:'cms'},
      { name: '圆通', value:'yuantong'},
      { name: '天天', value:'tiantian'},
      { name: '百世汇通', value: 'huitongkuaidi' },
      { name: '韵达', value: 'yunda' },
    ],
    //还有个postType,没写出来再onLoad进行初始化
  },
//初始化加载函数
  onLoad:function(){
    this.data.postType=this.data.packageType[0].value;
  },
//挑选器绑定函数
  bindChange:function(event){
    var index=event.detail.value[0];
    this.data.postType=this.data.packageType[index].value;
    console.log(this.data.postType);
  },
  //bindtap
  bindtap:function(e){
    
  },
  //快递查询按钮的回调函数
  search:function(event){
    var thisx = this;
    var postid = event.detail.value.postid;
    wx.cloud.callFunction({
      name:"requesthttp",
      data:{
        'url': 'http://www.kuaidi100.com/query?postid=' + postid + "&type=" + thisx.data.postType +"&temp=0.08974731506292755&phone=",
      },
      success: function (res) {
        //本地将字符串格式的return数据解析为json数据
        var data=JSON.parse(res.result);
        console.log(data);
        if (data.message != 'ok') {
          wx.showToast({
            icon: 'none',
            title: '查询参数错误',
            duration: 3000
          });
        }
        else {
          wx.showToast({
            title: '成功',
            icon: 'loading',
            duration: 2000
          });
          thisx.setData({
            result: data.data,
          });
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
//表单提交函数
  Search:function (event){
    var thisx=this;
    var postid=event.detail.value.postid;
    wx.request({
      url: 'http://www.kuaidi100.com/query',
      data:{
        'type':thisx.data.postType,
        'postid':postid,
        'temp':'0.08974731506292755',
        'phone':'',
      },
      method:'GET',
      header:{
        'Cookie': 'WWWID=WWWA4BF1204CBD93FEC4EDE8DD98998ED58; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=1556177566; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=1556177577; closeCodepre=1',
      },
      success:function(res){
        console.log(res.data);
        var data=res.data;
        if(data.message!='ok'){
          wx.showToast({
          icon:'none',
          title:'查询参数错误',
          duration:3000
          });
        }
        else{
          wx.showToast({
            title: '成功',
            icon: 'loading',
            duration: 2000
          });
          thisx.setData({
            result:data.data,
          });
        }
      }
    });
  },
  
})