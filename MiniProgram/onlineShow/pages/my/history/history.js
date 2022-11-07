// pages/my/history/history.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      historyList:[]  // 历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHistory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getHistory:function(){
    let result = wx.getStorageSync('history');
    this.setData({
      historyList:result || []
    })
  },
  clearHistory:function(){
    let that = this;
    wx.showModal({  
      title: '提示',  
      content: '确认清除历史记录?',  
      success: function(res) {  
          if (res.confirm) {  
            wx.removeStorageSync('history')
            that.setData({
              historyList:[]
            })
          } 
      }  
  })  
    //wx.clearStorageSync('history')
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