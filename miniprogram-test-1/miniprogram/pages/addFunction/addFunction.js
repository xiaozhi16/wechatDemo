const http=require("../../utils/request.js");
Page({
  onLoad:function(){
      var location=http.httpget({
        url: "https://apis.map.qq.com/ws/geocoder/v1/",
        data: {
          "key":"NLRBZ-2WY3D-SEC4S-PHNXB-FFK37-MUF2I",
          "location":"34.128,128.23"
         },
        header: { }
      });
      console.log(location);
  }
  
})