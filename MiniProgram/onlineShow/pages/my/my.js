// pages/my/my.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      openid:'',
      favNum:0,
      historyNum:0,
      orderNum:0
  },
  getUserProfile(e) {
     const that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userinfo', this.data.userInfo)
        console.log(this.data.userInfo);
      }
    })
    wx.cloud.callFunction({
      name:'login',
      success:res=>{
        that.setData({
          openid:res.result.openid
        })
        wx.setStorageSync('openid', this.data.openid)
      },
      fail:err=>{
        console.error('云函数调用失败');
      }
    })

  },
  logout(){
    this.setData({
      userInfo:null,
      openid:null
    })
    wx.clearStorage({
      success: (res) => {},
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const userInfo = wx.getStorageSync('userinfo');
      const openid  = wx.getStorageSync('openid')
      this.setData({
        userInfo:userInfo,
        openid : openid 
      })
      this.getFavNum();
      this.getOrderNum();
      
  },
  goFav:function(){
    if(this.data.openid){
      wx.navigateTo({
        url: '/pages/my/favorite/favorite',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
    }
   
  },
  goOrder:function(){
    if(this.data.openid){
      wx.navigateTo({
        url: '/pages/my/order/order',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
    }
  },
  getFavNum:function(){
    let that =this;
    db.collection('favoriteCMS').where({
      openid:that.data.openid
    }).get({
      success(res){
        that.setData({
          favNum:res.data.length
        })
      }
    })
  },
  getOrderNum:function(){
    let that =this;
    db.collection('orderCMS').where({
      openid:this.data.openid
    }).get({
      success(res){
        that.setData({
          orderNum:res.data.length
        })
      }
    })
  },
  goHistory:function(){
    if(this.data.openid){
      wx.navigateTo({
        url: '/pages/my/history/history',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHistoryNum()
    this.getFavNum();
    this.getOrderNum();
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHistoryNum();
    this.getFavNum();
      this.getOrderNum();
  },
 getHistoryNum:function(){
   let listLng = wx.getStorageSync('history')
   this.setData({
     historyNum:listLng.length
   })
 },
  /**
   * 生命周期函数--监听页面隐藏
   */

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