/**
 * by:MRx16
 * param:
 *      url 进行http访问的url
 *      data：进行传递的数据
 *      header：构造的头部
 * return：
 *    返回访问的结果
 */
function httpget({url,data,header}){
  var resu=null;
  var payload=url+"?"
  for(var key in data){
    payload=payload + key + "=" + data[key] + "&";
  }

  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({
      name:"requesthttp",
      data: {
        "url": payload,
        "header": header
      },
    });
    resolve();
    

  })
  /*wx.cloud.callFunction({
    name:"requesthttp",
   
    success:(res)=>{
      var resu=JSON.parse(res.result);

    },
    fail:(err)=>{
      console.log(err);
    }
  });
*/

}

function httppost(){

}
module.exports={
  "httpget":httpget,
  "httppost":httppost
}