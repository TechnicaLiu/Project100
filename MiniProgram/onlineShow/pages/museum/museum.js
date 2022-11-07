// pages/museum/museum.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    museumid:'', // 展览馆id
    museumInfo:{}, // 展览馆具体信息
    otherArticle:[], // 其他展品信息 
    isFavorite:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let museumid = options.id;
    this.setData({
      museumid:museumid
    })
    this.getMuseumInfo();
    this.getOtherArticle();
    this.isFavorite(museumid);  

  },
  isFavorite:async function(museumid){
    let openid = wx.getStorageSync('openid');
    let res = await db.collection('favoriteCMS').where({
      openid: openid,
      museumid:museumid
    }).get()
    console.log(res);
    if(res.data.length  < 1 ){
      this.setData({
        isFavorite: false
      })
    }else {
      this.setData({
        isFavorite:true
      })
    }
  },
  getMuseumInfo:async function(){
    let res = await db.collection('museumCMS').where({
      _id: this.data.museumid
    }).get();
    if(res.data.length >=1){
      this.setData({
        museumInfo:res.data[0]
      })
    }
    
    
  },
  getOtherArticle:async function(){
    let res = await db.collection('articleCMS').where({
      museumid:this.data.museumid
    }).get()
    if(res.data.length >=1){
      this.setData({
        otherArticle:res.data
      })
    }

  },
  toMap(e){
    let location = e.currentTarget.dataset.location;
    wx.navigateTo({
      url: '/pages/museum/map/map?location='+location,
    })
  },

  favoriteChange:function(){
    let openid = wx.getStorageSync('openid');
    if(!openid){
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      return false;
    }
    if(!this.data.isFavorite){
       db.collection('favoriteCMS').add({
         data:{
           openid:openid,
           museumid:this.data.museumid
         },
         success(res){
          console.log(res);
          wx.showToast({
            title: '收藏成功',
          })
         }
       })
       this.setData({
        isFavorite: true
       })
       return
    }
    if(this.data.isFavorite){
      db.collection('favoriteCMS').where({
        _openid:openid,
        museumid:this.data.museumid

      }).remove({
        success(res){
          wx.showToast({
            title: '取消成功',
            icon:'success'
          })
        }

      });
      this.setData({
        isFavorite:false
      })
      return 
    }
    

  },
  goSubscribe:function(){
    wx.navigateTo({
      url: '/pages/subscribe/subscribe?museumid='+this.data.museumid,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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