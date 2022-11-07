// pages/classify/classify.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   recommendCategories:[],
   categoryList:[],
  },

/*   goArticleList(e){
    wx.navigateTo({
      url: '/pages/classify/classify?pid=' + e.currentTarget.dataset.id
    })
  }, */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getRecommendCategories();
      this.getCatesubCate();
  },

  getRecommendCategories:async function(){
   let res =await db.collection('subCateCMS').where({
      "isRecommand": true
    }).get();
    this.setData({
      recommendCategories:res.data
    })

  },
  getCatesubCate: function(){
     wx.cloud.callFunction({
      name:'category',
      data:{
        action:'getCatesubCate'
      }
    }).then(res=>{
      console.log(res);
      let list = res.result.list;
      list.map(item=>{
        return item.allData.splice(2)
      })
      this.setData({
        categoryList: list
      })
    })
        
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {

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