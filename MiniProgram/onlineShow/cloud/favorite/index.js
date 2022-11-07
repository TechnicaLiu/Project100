// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'getFavMuseum':{
      return getFavMuseum(event)
    }
    case 'getFavArticle':{
      return getFavArticle(event)
    }
    default:{
      return 
    }
  }
}

function getFavMuseum(event){
  return  db.collection('favoriteCMS').aggregate()
  .lookup({
    from: 'museumCMS',
    localField: 'museumid',
    foreignField: '_id',
    as: 'allMuseum'
  })
  .match({
    openid:event.openid
  })
  .end()
  .then(res=>{
      return res
  })
  .catch(err=>{
    return err
  })
}

function getFavArticle(event){
  return  db.collection('favoriteCMS').aggregate()
  .lookup({
    from: 'articleCMS',
    localField: 'articleid',
    foreignField: '_id',
    as: 'allArticle'
  })
  .match({
    openid:event.openid
  })
  .end()
  .then(res=>{
      return res
  })
  .catch(err=>{
    return err
  })
}