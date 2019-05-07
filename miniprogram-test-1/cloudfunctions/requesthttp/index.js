// 云函数入口文件
const cloud = require('wx-server-sdk');
var rp = require('request-promise');
cloud.init();

// 云函数入口函数

exports.main = async (event, context) => {

  var url =event.url;

  // return{

  //   event,context

  // }
  return new Promise((resolve, reject) => {

    rp.get(url, (error, response, body) => {

      if (error) {
        reject()
      } else {
        try {
          resolve(body)
        } catch (e) {
          reject()
        }

      }

    })

  })

}