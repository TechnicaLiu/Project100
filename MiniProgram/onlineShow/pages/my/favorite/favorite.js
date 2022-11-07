// pages/my/favorite/favorite.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    articleList:[],
    museumList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid  = wx.getStorageSync('openid')
    this.setData({
      openid : openid 
    })
    this.getFavArticle();
  },
  tabChange:function(e){
    if(e.detail.index == 0){
      this.getFavArticle()
    }else{
      this.getFavMuseum()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getFavMuseum:function(){
    wx.cloud.callFunction({
      name:'favorite',
      data:{
        action:'getFavMuseum',
        openid:this.data.openid
      }
    }).then(res=>{
      let result = res.result.list;
      result = result.filter(item=> item.allMuseum.length !== 0 );
      let newArr = []
      for(let i =0 ; i< result.length ; i++){
         newArr = newArr.concat(result[i].allMuseum)
      }
      this.setData({
        museumList:newArr
      })

    })   
  },

  getFavArticle:function(){
    wx.cloud.callFunction({
      name:'favorite',
      data:{
        action:'getFavArticle',
        openid:this.data.openid
      }
    }).then(res=>{
      let result = res.result.list;
      result = result.filter(item=> item.allArticle.length !== 0 );
      let newArr = []
      for(let i =0 ; i< result.length ; i++){
         newArr = newArr.concat(result[i].allArticle)
      }
      this.setData({
        articleList:newArr
      })

    })   
  },



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