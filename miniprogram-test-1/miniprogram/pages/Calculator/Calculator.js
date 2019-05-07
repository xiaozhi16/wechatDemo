Page({
data:{
  sum:0,
},
submit:function(event){
  var that=this;
  var localA=event.detail.value.a*1;
  var localB=event.detail.value.b*1;
  wx.cloud.callFunction({
    name:'addition',
    data:{
      a:localA,
      b:localB
    },
    success:res=>{
      that.setData({sum:res.result.sum});
    },
    fail:console.error
  });
}
})