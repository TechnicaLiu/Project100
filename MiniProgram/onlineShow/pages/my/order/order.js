// pages/my/order/order.js
const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp//dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid  = wx.getStorageSync('openid')
    this.setData({
      openid : openid 
    })
    this.getOrderInfo(openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  cancelOrder(e){
    let that = this;
    let orderId = e.currentTarget.dataset.id;
    Dialog.alert({
      message: '确认取消该预约吗？',
    }).then(() => {
      db.collection('orderCMS').doc(orderId).remove({
        success(res){
          Toast.success('取消成功');
          that.getOrderInfo(this.data.openid)
        }
      })
    });
    
   
  },
  getOrderInfo: function(id){
    wx.cloud.callFunction({
      name:'order',
      data:{
        action:'getOrderList'
      }
    }).then(res=>{
      this.setData({
        orderList:res.result.list
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