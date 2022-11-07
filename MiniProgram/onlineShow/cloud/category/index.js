// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
   switch(event.action){
     case 'getCatesubCate':{
      return getCatesubCate(event)
     }
     default:{
       return 
     }
   }
}

 function getCatesubCate(event){
   return db.collection('categoryCMS').aggregate()
        .lookup({
          from:"subCateCMS",
          localField:"_id",
          foreignField:"cateId",
          as:'allData'
        })
        .end({
          success:function(res){
            return res;
          },
          fail(error){
            return error;
          }
        })
        
  
}