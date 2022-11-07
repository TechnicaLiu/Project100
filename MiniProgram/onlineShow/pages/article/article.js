const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId:null,
    articleDetail:{},
    imgUrls:[], // 轮播图数组
    tags:[],
    autoplay: false,      //是否自动切换
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    collected:false,
    museumDetail:{} // 展览馆信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let articleId = options.id;
     this.setData({
       articleId:articleId
     })
     this.getDetail();
    this.isFavorite(articleId);  
    
  },
  previewImage:function(e){
    wx.previewImage({
      current: this.data.imgUrls[0], // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
  },
  getDetail: async function(){
    let articleId = this.data.articleId;
    let res = await db.collection('articleCMS').doc(articleId).get();
    this.setData({
      articleDetail:res.data,
      imgUrls:res.data.moreImgs,
      tags:res.data.tags
    })
    this.getMuseum();
    this.addHistory();
  },
  getMuseum:async function(){
    let museumid = this.data.articleDetail.museumid;
    let museum = await db.collection('museumCMS').where({
      "_id": museumid
    }).get();
    this.setData({
        museumDetail:museum.data[0]
    })
    
  },
  onShare: function() {
    const itemList = [
      '分享到朋友圈',
      '分享到好友',
      '分享到QQ'
    ]

    wx.showActionSheet({
      itemList,
      itemColor: "#405f80",
      success: function(res) {
        if(res.tapIndex !== undefined) {
          wx.showModal({
            title: itemList[res.tapIndex],
            content: '是否把该文章' + itemList[res.tapIndex]
          })
        }
      }
    })
  },
  isFavorite:async function(articleId){
    let openid = wx.getStorageSync('openid');
    let res = await db.collection('favoriteCMS').where({
      openid: openid,
      articleid:articleId
    }).get()
    console.log(res);
    if(res.data.length  < 1 ){
      this.setData({
        collected: false
      })
    }else {
      this.setData({
        collected:true
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onCollected:function(){
    let openid = wx.getStorageSync('openid');
    if(!openid){
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      return false;
    }
    if(!this.data.collected){
       db.collection('favoriteCMS').add({
         data:{
           openid:openid,
           articleid:this.data.articleId
         },
         success(res){
          console.log(res);
          wx.showToast({
            title: '收藏成功',
          })
         }
       })
       this.setData({
         collected: true
       })
       return
    }
    if(this.data.collected){
      db.collection('favoriteCMS').where({
        _openid:openid,
        articleid:this.data.articleId

      }).remove({
        success(res){
          wx.showToast({
            title: '取消成功',
            icon:'success'
          })
        }

      });
      this.setData({
        collected:false
      })
      return 
    }
    

  },
  addHistory:function(){
    let d= new Date();
    const data = this.data.articleDetail;
    let history = wx.getStorageSync('history');
    if(!history){
      history = []
    }
    const index = history.findIndex(item=>item.id === data._id);
    if(index!==-1){
      history.splice(index,1);

    }
    history.unshift({
      id:data._id,
      title:data.title,
      image:data.pic,
      info:data.shortInfo,
      time:`${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes()}`
    })
    wx.setStorageSync('history', history)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})