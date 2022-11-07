// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'getOrderList':{
      return getOrderList(event)
    }
    default:{
      return 
    }
  }
}

function getOrderList(event){
 return  db.collection('orderCMS').aggregate()
    .lookup({
      from:'museumCMS',
      localField:'museumid',
      foreignField:'_id',
      as:'allData'
    })
    .match({
      openid:event.openid
    })
    .end()
    .then(res=>{
      return res 
    })
}