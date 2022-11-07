// pages/location/location.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isrecommand: 0,
    hasprice: 0,
    recommandTab:[
      { text: '随机展示', value: 0 },
      { text: '推荐展馆', value: 1 },
    ],
    priceTab:[
      { text: '默认排序', value: 0 },
      { text: '价格升序', value: 1 },
      { text: '价格降序', value: 2 },
    ],
    museumList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMuseumList()
  },

  getMuseumList:async function(){
    let res= await db.collection('museumCMS').get();
    this.setData({
        museumList : res.data
    })
  },
    onSearch(e) {
      let that = this;
      let value = e.detail ? e.detail : '' ;
      const _ = db.command
      db.collection('museumCMS').where(
        _.and([{
          name: db.RegExp({
            regexp: '.*' + value,
            options: 'i',
          })
        }])
      ).get({
        success: res => {
          that.setData({
            museumList:res.data
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    },

    onCancel(e){
      this.onSearch(e)
    },
    recommandChange(e){
      let that = this;
     if(e.detail == 1){
       db.collection('museumCMS').where({
         isRecommand:true
       }).get()
       .then(res=>{
          that.setData({
            museumList:res.data
          })
       })
     }else{
      this.getMuseumList()
     }
    },
    priceChange(e){
      let that =this;
      if(e.detail == 1){
        db.collection('museumCMS').orderBy('price','asc').get()
        .then(res=>{
           that.setData({
             museumList:res.data
           })
        })
      }else if(e.detail == 2){
        db.collection('museumCMS').orderBy('price','desc').get()
        .then(res=>{
           that.setData({
             museumList:res.data
           })
        })
      }else{
        this.getMuseumList()
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