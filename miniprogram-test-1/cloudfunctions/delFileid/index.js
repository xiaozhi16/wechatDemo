// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({ env: "calculator-upern" });
  return await db.collection("calculator").doc("ce1079d8-18f9-4dc9-ba4f-da0ce097dfc7").update({
    data: {
      "fileID": event.fileid
    },
  });

}