// pages/subscribe/subscribe.js
const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    museumid:null,
    museumInfo:{},
    username:'', // 姓名
    phone:'',  // 电话
    data:null,  // 预约日期
    calendarshow:false,
    show: false,
    minDate: new Date(2022, 1, 1).getTime(),
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      museumid: options.museumid
    })
    this.getMuseumInfo(options.museumid)
  },

  getMuseumInfo:async function(id){
      let res = await db.collection('museumCMS').doc(id).get();
      let openDate = res.data.openDate;
      let minDate = new Date(`${openDate}`).getTime();
      this.setData({
        museumInfo:res.data,
        minDate:minDate
      })
  },
  sendSms:function(){
    setTimeout(()=>{
      Toast('短信验证码为：6666');
    },1000)
  },
  onDisplay(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    })
  },
  submitOrder:async function(){
    let {username,phone,date,sms,museumid} = this.data;
    let openid = wx.getStorageSync('openid');
    if(sms !== '6666'){
      Toast.fail('验证码错误');
    }else if(!openid){
      Toast.fail('请先登录再预约');
    }else{
      let params ={
        username,
        phone:phone,
        orderDate:date,
        museumid:museumid,
        openid:openid
      }
      let res = await db.collection('orderCMS').add({data:params});
      if(res){
        Toast.success('预约成功');
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
      }
    }


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