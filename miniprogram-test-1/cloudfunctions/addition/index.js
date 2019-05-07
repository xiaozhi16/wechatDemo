// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var sum=0;
  wx.cloud.callFunction({
    name:"inputdb",
    data:{
      a:event.a,
      b:event.b
    },
    success:res=>{
      sum:res.result.sum;
    }
  })
  return {
    sum,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}